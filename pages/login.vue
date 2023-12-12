<template>
    <main class="mx-auto w-full xl:w-10/12 grid place-items-center">
        <UCard class="bg-white dark:bg-zinc-900 w-[22rem]">
            <template #header>
                <h2
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                >
                    Login to your account
                </h2>
                <p class="text-sm text-red-600 h-5">{{ errorMessage }}</p>
            </template>

            <UInput
                name="email"
                id="email"
                variant="outline"
                type="email"
                placeholder="Email"
                class="w-full mb-4"
                :color="errorMessage != '' ? 'red' : 'gray'"
                @input="() => (errorMessage = '')"
                v-model="email"
                required
            />
            <UInput
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                class="w-full"
                :color="errorMessage != '' ? 'red' : 'gray'"
                @input="() => (errorMessage = '')"
                v-model="password"
                required
            />

            <ULink
                to="/forgotpassword"
                class="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                >Forgot password?</ULink
            >

            <template #footer>
                <UButton @click="login">Login</UButton>
                <UButton to="/register" class="ml-3" variant="outline">
                    Create an Account
                </UButton>
            </template>
        </UCard>
    </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

watchEffect(() => {
    if (user.value) {
        reloadNuxtApp();
        navigateTo("/account");
    }
});

const login = async () => {
    const { data, error } = await auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });
    if (error) {
        console.error(error);
        errorMessage.value = error.message;
    } else {
        console.log(data);
    }
};
</script>
