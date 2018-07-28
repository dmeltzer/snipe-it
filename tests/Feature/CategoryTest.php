<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\DatabaseTestCase;

class CategoryTest extends DatabaseTestCase
{
    use CreatesValidTestObjects;
    use WithFaker;

    public function testFailsEmptyValidation()
    {
        // An Asset requires a name, a qty, and a category_id.
        $a = Category::create();
        $this->assertFalse($a->isValid());

        $fields = [
            'name' => 'name',
            'category_type' => 'category type'
        ];
        $errors = $a->getErrors();
        foreach ($fields as $field => $fieldTitle) {
            $this->assertEquals($errors->get($field)[0], "The ${fieldTitle} field is required.");
        }
    }

    public function testACategoryCanHaveAssets()
    {
        $this->createValidManufacturer();
        $this->createValidDepreciation();
        $category = $this->createValidCategory('asset-desktop-category', ['category_type' => 'asset']);
        $models = factory(\App\Models\AssetModel::class, 5)->states('tests')->create(['category_id' => $category->id]);

        $this->assertEquals(5, $category->has_models());
        $this->assertCount(5, $category->models);

        $models->each(function($model) {
            factory(\App\Models\Asset::class, 2)->create(['model_id' => $model->id]);
        });
        $this->assertEquals(10, $category->itemCount());
    }

    public function testACategoryCanHaveAccessories()
    {
        $category = $this->createValidCategory('accessory-keyboard-category', ['category_type' => 'accessory']);
        $this->createValidManufacturer();
        factory(\App\Models\Accessory::class, 5)->states('tests')->create(['category_id' => $category->id]);

        $this->assertCount(5, $category->accessories);
        $this->assertEquals(5, $category->itemCount());
    }

    public function testACategoryCanHaveConsumables()
    {
        $category = $this->createValidCategory('consumable-paper-category', ['category_type' => 'consumable']);
        $this->createValidManufacturer();
        factory(\App\Models\Consumable::class, 5)->states('tests')->create(['category_id' => $category->id]);
        $this->assertCount(5, $category->consumables);
        $this->assertEquals(5, $category->itemCount());
    }

    public function testACategoryCanHaveComponents()
    {
        $category = $this->createValidCategory('component-ram-category', ['category_type' => 'component']);
        $this->createValidManufacturer();
        factory(\App\Models\Component::class, 5)->states('tests')->create(['category_id' => $category->id]);
        $this->assertCount(5, $category->components);
        $this->assertEquals(5, $category->itemCount());
    }
}
