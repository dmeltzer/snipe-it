<?php
namespace App\Providers;


use App\Models\Accessory;
use App\Models\Asset;
use App\Models\Component;
use App\Models\Consumable;
use App\Models\License;
use App\Models\Setting;
use App\Observers\AccessoryObserver;
use App\Observers\AssetObserver;
use App\Observers\ComponentObserver;
use App\Observers\ConsumableObserver;
use App\Observers\LicenseObserver;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Log;


/**
 * This service provider handles setting the observers on models
 *
 * PHP version 5.5.9
 * @version    v3.0
 */

class AppServiceProvider extends ServiceProvider
{
    /**
     * Custom email array validation
     *
     * @author [A. Gianotto] [<snipe@snipe.net>]
     * @since [v3.0]
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        Asset::observe(AssetObserver::class);
        Accessory::observe(AccessoryObserver::class);
        Component::observe(ComponentObserver::class);
        Consumable::observe(ConsumableObserver::class);
        License::observe(LicenseObserver::class);


    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $monolog = Log::getMonolog();
        $log_level = config('app.log_level');

        if (($this->app->environment('production'))  && (config('services.rollbar.access_token'))){
            $this->app->register(\Rollbar\Laravel\RollbarServiceProvider::class);
        }

        foreach ($monolog->getHandlers() as $handler) {
            $handler->setLevel($log_level);
        }

        $this->app->singleton(Setting::class, function($app) {
            return Setting::getSettings();
        });
        $this->app->alias(Setting::class, 'Settings');
    }
}
