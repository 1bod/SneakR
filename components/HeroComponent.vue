<template>
    <div>
        <div
            class="w-full h-[65vh] grid place-items-center before:absolute before:inset-0 before:h-[65vh] before:w-full dark:before:bg-[linear-gradient(to_right,#4e4e56_1px,transparent_1px),linear-gradient(to_bottom,#4e4e56_1px,transparent_1px)] before:bg-[linear-gradient(to_right,#dadadd_1px,transparent_1px),linear-gradient(to_bottom,#dadadd_1px,transparent_1px)] before:bg-[size:7rem_7rem] before:[mask-image:radial-gradient(ellipse_50%_45%_at_50%_50%,#000_60%,transparent_100%)] after:absolute after:inset-0 after:h-[65vh] after:w-full after:bg-[linear-gradient(to_right,rgb(var(--color-primary-DEFAULT))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--color-primary-DEFAULT))_1px,transparent_1px)] after:bg-[size:7rem_7rem] after:[mask-image:radial-gradient(ellipse_35%_45%_at_30%_50%,#000d_30%,transparent_100%)]"
        >
            <div class="w-min sm:w-4/6 font-display z-10">
                <h1 class=" text-8xl md:text-9xl font-black">
                    <slot name="title"></slot>
                </h1>
                <p class="text-lg md:text-xl mx-1.5">
                    <slot name="description"></slot>
                </p>
            </div>
        </div>
    </div>
</template>
