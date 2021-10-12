<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="Muzle Spēles" content="Muzle Digitālās Spēles">
    <title>Muzle Dabas Spēles</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    <!-- Scripts -->
    <script src="{{ mix('js/public.js') }}" defer></script>
  </head>
  <body class="antialiased">
    <header class="z-10 h-16 bg-yellow-900 text-white shadow1 px-2 lg:px-0">
      <div class="container max-w-screen-xl mx-auto flex items-center h-full">
        <a class="h-full flex items-center" href="/">
          <img class="h-8" src="/img/logo-white.png" alt="" />
        </a>
        <div class="pl-8 space-x-2 h-full flex">
          
            <a
              href='/games'
              class="h-full px-2 flex items-center hover:bg-yellow-800 active:bg-yellow-800"
            >
              Digitālās spēles
            </a>
            
            <a
              href='http://www.muzle.lv'
              class="h-full px-2 flex items-center hover:bg-yellow-800 active:bg-yellow-800"
            >
              Koka spēles
            </a>
          
          <a
            href='/'
            class="h-full px-2 flex items-center hover:bg-yellow-800 active:bg-yellow-800"
          >
            Kontakti
          </a>
        </div>
        <div class="flex-grow"></div>
        @auth
          @if (auth()->user()->role == 'admin')
            <a href="{{ url('/management') }}" class="h-full px-2 flex items-center hover:bg-yellow-800 active:bg-yellow-800">
              Management
            </a>
          @else
            <a href="/logout" class="h-full px-2 flex items-center hover:bg-yellow-800 active:bg-yellow-800">
              Logout
            </a>
            {{-- <div x-data="{ open: false }" class="relative">
              <button
                class="px-4 h-10 rounded-md flex items-center justify-center focus:outline-none hover:bg-yellow-800 active:bg-gray-200 cursor-pointer"
                x-on:click="open = true"
              >
              {{auth()->user()->name}}
              </button>
              <div
                x-show.transition="open"
                x-on:click.away="open = false"
                class="absolute right-0 py-2 bg-white border rounded shadow-xl"
              >
                <a href="/logout" class="block px-4 py-2 text-gray-900 hover:bg-gray-200">
                  Logout
                </a>
              </div>
            </div> --}}
          @endif
        @else
          <a href="{{ url('/login') }}" class="h-full px-2 text-white hover:bg-yellow-800 active:bg-yellow-800 flex items-center">
            Ienākt
          </a>
        @endauth
      </div>
    </header>
    <main class="h-full overflow-y-auto px-2 lg:px-0">
      @yield('content')
    </main>
  </body>
</html>
