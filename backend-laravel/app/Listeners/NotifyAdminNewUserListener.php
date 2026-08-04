<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Mail\NewUserRegisteredMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class NotifyAdminNewUserListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserRegistered $event): void
    {
        Mail::to(config('mail.admin'))
            ->send(new NewUserRegisteredMail($event->user));
    }
}
