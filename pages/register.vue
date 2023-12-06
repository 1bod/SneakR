<template>
    <div class="grid place-items-center">
        <UCard class="bg-white dark:bg-zinc-900 w-[22rem]">
            <template #header>
                <h2
                    class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                >
                    Register an Account
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
                v-model="email"
                color="gray"
            />
            <UInput
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                class="w-full mb-4"
                v-model="password"
                color="gray"
            />

            <UInput
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                class="w-full"
                v-model="confirmPassword"
                color="gray"
            />

            <template #footer>
                <UButton @click="register">Register</UButton>
                <UButton to="/login" class="ml-3" variant="outline">
                    Already have an Account
                </UButton>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const supabase = useSupabaseClient();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const register = async () => {
    if (password.value != confirmPassword.value) {
        console.error("Passwords do not match");
        errorMessage.value = "Passwords do not match";
        return;
    }
    const { data, error } = await supabase.auth.signUp({
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
