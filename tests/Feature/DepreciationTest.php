<?php

namespace Tests\Feature;

use App\Models\Depreciation;
use Tests\DatabaseTestCase;

class DepreciationTest extends DatabaseTestCase
{
    use CreatesValidTestObjects;

    public function testFailsEmptyValidation()
    {
        // An Asset requires a name, a qty, and a category_id.
        $a = Depreciation::create();
        $this->assertFalse($a->isValid());

        $fields = [
            'name' => 'name',
            'months' => 'months',
        ];
        $errors = $a->getErrors();
        foreach ($fields as $field => $fieldTitle) {
            $this->assertEquals($errors->get($field)[0], "The ${fieldTitle} field is required.");
        }
    }

    public function testADepreciationHasModels()
    {
        $this->createValidAssetModel();
        $this->createValidCategory('asset-laptop-category', ['category_type' => 'asset']);
        $depreciation = $this->createValidDepreciation('computer', ['name' => 'New Depreciation']);
        $models = factory(\App\Models\AssetModel::class, 5)->states('tests')->create(['depreciation_id'=>$depreciation->id]);
        $this->assertEquals(5,$depreciation->has_models());
    }

    public function testADepreciationHasLicenses()
    {
        $category = $this->createValidCategory('license-graphics-category');
        $this->createValidManufacturer();
        $depreciation = $this->createValidDepreciation('computer', ['name' => 'New Depreciation']);
        $licenses = factory(\App\Models\License::class, 5)->states('tests')->create([
            'depreciation_id'=>$depreciation->id,
            'category_id' => $category->id
        ]);

        $this->assertEquals(5,$depreciation->has_licenses());
    }
}
