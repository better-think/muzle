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

        <form method="POST" action="{{ url('/login') }}">
            @csrf

            <!-- Tenant -->
            <div>
                <label class="block font-medium text-sm text-gray-700">
                    Tenant
                </label>
                <select
                    class="block mt-1 w-full px-3 py-2 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    name="tenant_id"
                    :value="old('tenant_id')"
                >
                    @foreach ($tenants as $tenant)
                        <option value="{{$tenant->id}}">
                            {{ $tenant->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <!-- Nickname -->
            <div class="mt-4">
                <label for="nickname" class="block font-medium text-sm text-gray-700">
                    Vārds
                </label>
                <x-input
                    id="nickname"
                    class="block mt-1 w-full"
                    type="text"
                    name="nickname"
                    :value="old('nickname')"
                    required
                    autofocus
                />
            </div>

            <!-- Password -->
            <div class="mt-4">
                <label for="nickname" class="block font-medium text-sm text-gray-700">
                    Parole
                </label>
                <x-input
                    id="password"
                    class="block mt-1 w-full"
                    type="password"
                    name="password"
                    required
                    autocomplete="current-password"
                />
            </div>

            <div class="flex items-center justify-end mt-4">
                <x-button class="ml-3">
                    Ienākt
                </x-button>
            </div>
        </form>
    </x-auth-card>
</x-guest-layout>
