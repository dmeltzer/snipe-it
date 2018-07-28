<?php
/**
 * Created by PhpStorm.
 * User: hydrogen
 * Date: 7/28/18
 * Time: 10:25 AM
 */

namespace Tests\Feature;


use App\Models\Asset;
use App\Models\AssetModel;
use App\Models\Category;
use App\Models\Company;
use App\Models\Department;
use App\Models\Depreciation;
use App\Models\Location;
use App\Models\Manufacturer;
use App\Models\Statuslabel;
use App\Models\Supplier;
use App\Models\User;

trait CreatesValidTestObjects
{
    protected function createValidAssetModel($state = 'mbp-13-model', $overrides = [])
    {
        return AssetModel::find(1) ?? factory(AssetModel::class)->states($state)->create(array_merge([
            'category_id' => $this->createValidCategory('asset-laptop-category', ['category_type' => 'asset']),
            'manufacturer_id' => $this->createValidManufacturer(),
            'depreciation_id' => $this->createValidDepreciation(),
        ],$overrides));
    }

    protected function createValidCategory($state = 'asset-laptop-category', $overrides = [])
    {
        return Category::where($overrides)->first() ?? factory(\App\Models\Category::class)
                ->states($state)
                ->create($overrides);
    }

    protected function createValidCompany($overrides = [])
    {
        return Company::where($overrides)->first() ?? factory(Company::class)->create($overrides);
    }


    protected function createValidDepartment($state = 'engineering', $overrides = [])
    {
        return Department::where($overrides)->first() ?? factory(Department::class)->states($state)->create(array_merge([
            'location_id' => $this->createValidLocation()->id
        ], $overrides));
    }

    protected function createValidDepreciation($state = 'computer', $overrides = [])
    {
        return Depreciation::where($overrides)->first() ?? factory(Depreciation::class)->states($state)->create($overrides);
    }

    protected function createValidLocation($overrides = [])
    {
        return Location::where($overrides)->first() ?? factory(Location::class)->create($overrides);
    }

    protected function createValidManufacturer($state = 'apple', $overrides = [])
    {
        return Manufacturer::where($overrides)->first() ?? factory(Manufacturer::class)->states($state)->create($overrides);
    }

    protected function createValidSupplier($overrides = [])
    {
        return Supplier::where($overrides)->first() ?? factory(Supplier::class)->create($overrides);
    }

    protected function createValidStatuslabel($state = 'rtd', $overrides= [])
    {
        return Statuslabel::where($overrides)->first() ?? factory(Statuslabel::class)->states($state)->create($overrides);
    }

    protected function createValidUser($overrides= [])
    {
        return User::where($overrides)->first() ?? factory(User::class)->create($overrides);
    }

    protected function createValidAsset($overrides = [])
    {
        $locId = $this->createValidLocation();
        $this->createValidAssetModel();
        return Asset::where($overrides)->first() ?? factory(\App\Models\Asset::class)->states('laptop-mbp')->create(array_merge([
            'rtd_location_id' => $locId,
            'location_id' => $locId
        ], $overrides));
    }
}