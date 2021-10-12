<x-guest-layout>
    <x-auth-card>
        <x-slot name="logo">
            <a href="/">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
            </a>
        </x-slot>

        <!-- Session Status -->
        <x-auth-session-status class="mb-4" :status="session('status')" />

        <!-- Validation Errors -->
        <x-auth-validation-errors class="mb-4" :errors="$errors" />

        <form method="POST" action="{{ url('/admin') }}">
            @csrf

            <!-- Nickname Address -->
            <div>
                <label for="nickname" class="block font-medium text-sm text-gray-700">
                    Vārds
                </label>

                <x-input id="nickname" class="block mt-1 w-full" type="text" name="nickname" :value="old('nickname')" required autofocus />
            </div>

            <!-- Password -->
            <div class="mt-4">
                <label for="nickname" class="block font-medium text-sm text-gray-700">
                    Parole
                </label>

                <x-input id="password" class="block mt-1 w-full"
                                type="password"
                                name="password"
                                required autocomplete="current-password" />
            </div>

            <div class="flex items-center justify-end mt-4">

                <x-button class="ml-3">
                    Ienākt
                </x-button>
            </div>
        </form>
    </x-auth-card>
</x-guest-layout>
