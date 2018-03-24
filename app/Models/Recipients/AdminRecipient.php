<?php
namespace App\Models\Recipients;

use App\Models\Setting;

class AdminRecipient extends Recipient{

    public function __construct()
    {
        $this->email = app('Settings')->admin_cc_email;
    }

}
