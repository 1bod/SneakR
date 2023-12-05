<template>
    <UContainer
        class="flex flex-col relative height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium transition-transform-background motion-reduce:transition-none overflow-visible h-auto lg:h-[240px] dark:border-transparent rounded-3xl font-sans"
    >
        <div
            class="rounded-3xl bg-white dark:bg-zinc-900 flex w-full p-3 flex-auto place-content-inherit align-items-inherit h-auto break-words text-left subpixel-antialiased relative flex-col md:flex-row md:items-center gap-4 md:gap-9 overflow-visible"
        >
            <div
                class="bg-gradient-to-br flex-none w-full sm:w-48 h-48 mb-6 sm:mb-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-br transition-all !ease-soft-spring !duration-500 will-change-auto before:transition-all lg:scale-[1.3] rounded-3xl before:rounded-3xl before:from-[#edf9ff] dark:before:from-[#001618 before:to-primary shadow-lg"
            >
                <NuxtImg
                    class="shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none object-[45%_50%] absolute z-10 inset-0 w-full h-full object-cover rounded-lg transition-all will-change-auto !ease-soft-spring !duration-300 sm:scale-90 sm:left-0"
                    src="https://image.goat.com/attachments/product_template_pictures/images/086/718/540/original/1203A281_100.png.png"
                />
            </div>
            <div class="flex flex-col justify-center transition-all h-[200px] ml-3">
                <h1
                    class="relative w-full flex-none font-semibold text-foreground text-2xl"
                >
                    ASICS Gel-NYC Shigen 2.0
                </h1>
                <p class="my-2 w-full text-default-500 text-sm">
                    White/Dolphin Blue
                </p>
                <p class="relative text-lg font-semibold text-foreground mt-2">
                    $120
                </p>
                <div class="flex space-x-4 mt-6">
                    <UButton
                        icon="i-heroicons-plus"
                        size="sm"
                        color="primary"
                        square
                        variant="ghost"
                    />
                    <UButton
                        icon="i-heroicons-heart"
                        size="sm"
                        color="primary"
                        square
                        variant="solid"
                    />
                </div>
            </div>
        </div>
    </UContainer>
</template>
