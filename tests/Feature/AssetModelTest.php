<?php

namespace Tests\Feature;

use App\Models\AssetModel;
use Tests\DatabaseTestCase;

class AssetModelTest extends DatabaseTestCase
{
    use CreatesValidTestObjects;

    public function testAnAssetModelRequiresAttributes()
    {
        // An Asset Model requires a name, a category_id, and a manufacturer_id.
        $a = AssetModel::create();
        $this->assertFalse($a->isValid());
        $fields = [
            'name' => 'name',
            'manufacturer_id' => 'manufacturer id',
            'category_id' => 'category id'
        ];
        $errors = $a->getErrors();
        foreach ($fields as $field => $fieldTitle) {
            $this->assertEquals($errors->get($field)[0], "The ${fieldTitle} field is required.");
        }
    }

    public function testAnAssetModelZerosOutBlankEols()
    {
        $am = new AssetModel;
        $am->eol = '';
        $this->assertTrue($am->eol === 0);
        $am->eol = '4';
        $this->assertTrue($am->eol==4);
    }

    public function testAnAssetModelContainsAssets()
    {
        $assetModel = $this->createValidAssetModel();
        $this->createValidAsset([
            'model_id' => $assetModel->id,
        ]);
        $this->assertEquals(1,$assetModel->fresh()->assets()->count());
    }

    public function testAnAssetModelHasACategory()
    {
        $assetmodel = $this->createValidAssetModel();
        $this->assertInstanceOf(\App\Models\Category::class, $assetmodel->category);
    }

    public function testAnAssetModelHasADepreciation()
    {

        $assetmodel = $this->createValidAssetModel();
        $this->assertInstanceOf(\App\Models\Depreciation::class, $assetmodel->depreciation);
    }

    public function testAnAssetModelHasAManufacturer()
    {
        $assetmodel = $this->createValidAssetModel();
        $this->assertInstanceOf(\App\Models\Manufacturer::class, $assetmodel->manufacturer);
    }
}
