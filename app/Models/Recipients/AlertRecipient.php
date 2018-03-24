<?php
namespace App\Models\Recipients;

use App\Models\Setting;

class AlertRecipient extends Recipient{

    public function __construct()
    {
       $this->email = app('Settings')->alert_email;
    }

}
