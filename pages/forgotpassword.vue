<template>
    <main class="mx-auto w-full xl:w-10/12 grid place-items-center">
        <UCard class="bg-white dark:bg-zinc-900 w-[22rem]">
            <template #header>
                <h2
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                >
                    Forgot Password
                </h2>
                <p class="text-sm text-red-600 h-5">{{ errorMessage }}</p>
            </template>

            <UInput
                name="email"
                id="email"
                variant="outline"
                type="email"
                placeholder="Email"
                class="w-full"
                :color="errorMessage != '' ? 'red' : 'gray'"
                @input="() => (errorMessage = '')"
                v-model="email"
                required
            />

            <template #footer>
                <UButton @click="forgotPassword">Send Reset Email</UButton>
            </template>
        </UCard>
    </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
const user = useSupabaseUser();
const { auth } = useSupabaseClient();
const toast = useToast();

const email = ref("");
const errorMessage = ref("");

watchEffect(() => {
    if (user.value) {
        reloadNuxtApp();
        navigateTo("/");
    }
});

const forgotPassword = async () => {
    const { error } = await auth.resetPasswordForEmail(email.value, {
        redirectTo: "http://" + window?.location.host + "/resetpassword",
    });
    if (error) {
        errorMessage.value = error.message;
    } else {
        toast.add({
            title: "Check your inbox",
            description:
                "We've sent you an email with a link to reset your password.",
            icon: "i-heroicons-envelope",
            timeout: 5000,
        });
    }
};
</script>
