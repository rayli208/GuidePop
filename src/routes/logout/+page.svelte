<script lang="ts">
    import { onMount } from 'svelte';
    import { authStore } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';

    onMount(async () => {
        await authStore.logout();
        goto('/login');
    });
</script>

<div class="flex justify-center items-center min-h-screen">
    <p>Logging out...</p>
</div>