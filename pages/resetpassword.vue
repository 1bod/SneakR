<template>
    <main class="mx-auto w-full xl:w-10/12 grid place-items-center">
        <UCard class="bg-white dark:bg-zinc-900 w-[22rem]">
            <template #header>
                <h2
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                >
                    Reset Password
                </h2>
                <p class="text-sm text-red-600 h-5">{{ errorMessage }}</p>
            </template>

            <UInput
                type="password"
                placeholder="Password"
                class="w-full mb-3"
                :color="errorMessage != '' ? 'red' : 'gray'"
                @input="() => (errorMessage = '')"
                v-model="password"
                required
            />

            <UInput
                type="password"
                placeholder="Confirm Password"
                class="w-full"
                :color="errorMessage != '' ? 'red' : 'gray'"
                @input="() => (errorMessage = '')"
                v-model="confirmPassword"
                required
            />

            <template #footer>
                <UButton @click="resetPassword">Set as new password</UButton>
            </template>
        </UCard>
    </main>
</template>

<script setup lang="ts">
const { auth } = useSupabaseClient();

const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const resetPassword = async () => {
    if (password.value != confirmPassword.value) {
        errorMessage.value = "Passwords do not match";
        return;
    }
    const { error } = await auth.updateUser({
        password: password.value,
    });
    if (error) {
        errorMessage.value = error.message;
    } else {
        navigateTo("/login");
    }
};
</script>
