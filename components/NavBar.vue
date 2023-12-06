<template>
    <nav
        class="flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 mb-2"
    >
        <header
            class="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-[1280px]"
        >
            <ul class="hidden lg:flex gap-4 justify-start items-center">
                <li><ULink to="/">SneakR</ULink></li>
                <ul>
                    <li><ULink to="/">Home</ULink></li>
                </ul>
            </ul>
            <ul class="hidden lg:flex gap-4 justify-start items-center">
                <li><ULink to="/collection">Collection</ULink></li>
                <li><ULink to="/wishlist">Wishlist</ULink></li>
                <li>
                    <ULink to="/account">
                        <UButton
                            icon="i-heroicons-user"
                            variant="ghost"
                            color="black"
                    /></ULink>
                </li>
            </ul>
        </header>
    </nav>
</template>
