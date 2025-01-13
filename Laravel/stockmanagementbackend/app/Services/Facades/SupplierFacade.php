<?php
namespace App\Services\Facades;

use Illuminate\Support\Facades\Facade;

class SupplierFacade extends Facade {
    protected static function getFacadeAccessor() {
        return 'SupplierService';
    }
}
