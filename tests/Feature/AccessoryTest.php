<?php

namespace Tests\Feature;

use App\Models\Accessory;
use App\Models\Category;
use Tests\DatabaseTestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AccessoryTest extends DatabaseTestCase
{

    use CreatesValidTestObjects;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testFailsEmptyValidation()
    {
        // An Accessory requires a name, a qty, and a category_id.
        $a = Accessory::create();
        $this->assertFalse($a->isValid());
        $fields = [
            'name' => 'name',
            'qty' => 'qty',
            'category_id' => 'category id'
        ];
        $errors = $a->getErrors();
        foreach ($fields as $field => $fieldTitle) {
            $this->assertEquals($errors->get($field)[0], "The ${fieldTitle} field is required.");
        }
    }

    public function testFailsMinValidation()
    {
        // An Accessory name has a min length of 3
        // An Accessory has a min qty of 1
        // An Accessory has a min amount of 0
        $a = factory(Accessory::class)->make([
            'name' => 'a',
            'qty' => 0,
            'min_amt' => -1
        ]);
        $fields = [
            'name' => 'name',
            'qty' => 'qty',
            'min_amt' => 'min amt'
        ];
        $this->assertFalse($a->isValid());
        $errors = $a->getErrors();
        foreach ($fields as $field => $fieldTitle) {
            $this->assertContains("The ${fieldTitle} must be at least", $errors->get($field)[0]);
        }
    }

    public function testCategoryIdMustExist()
    {
        $category = $this->createValidCategory('accessory-keyboard-category', ['category_type' => 'accessory']);
        $accessory = factory(Accessory::class)->states('apple-bt-keyboard')->make(['category_id' => $category->id]);
        $this->createValidManufacturer('apple');

        $accessory->save();
        $this->assertTrue($accessory->isValid());
        $newId = Category::count() + 1;
        $accessory = factory(Accessory::class)->states('apple-bt-keyboard')->make(['category_id' => $newId]);
        $accessory->save();
        $this->assertFalse($accessory->isValid());
        $this->assertContains("The selected category id is invalid.", $accessory->getErrors()->get('category_id')[0]);
    }

    public function testAnAccessoryBelongsToACompany()
    {
        $accessory = factory(Accessory::class)
            ->create(['company_id' => $this->createValidCompany()->id]);
        $this->assertInstanceOf(\App\Models\Company::class, $accessory->company);
    }

    public function testAnAccessoryHasALocation()
    {
        $accessory = factory(Accessory::class)
            ->create(['location_id' => $this->createValidLocation()->id]);
        $this->assertInstanceOf(\App\Models\Location::class, $accessory->location);
    }

    public function testAnAccessoryBelongsToACategory()
    {
        $accessory = factory(Accessory::class)->states('apple-bt-keyboard')
            ->create(['category_id' => $this->createValidCategory('accessory-keyboard-category', ['category_type' => 'accessory'])->id]);
        $this->assertInstanceOf(Category::class, $accessory->category);
        $this->assertEquals('accessory', $accessory->category->category_type);
    }

    public function testAnAccessoryHasAManufacturer()
    {
        $this->createValidCategory('accessory-keyboard-category');
        $accessory = factory(Accessory::class)->states('apple-bt-keyboard')->create([
            'category_id' => 1,
            'manufacturer_id' => $this->createValidManufacturer('apple')->id
        ]);
        $this->assertInstanceOf(\App\Models\Manufacturer::class, $accessory->manufacturer);
    }
}
