<script lang="ts">
    import { user } from '$lib/stores/authStore';
</script>

<div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Welcome, {$user?.firstName}!</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Your Information</h2>
        <div class="space-y-3">
            <p><span class="font-medium">Full Name:</span> {$user?.displayName}</p>
            <p><span class="font-medium">Email:</span> {$user?.email}</p>
            <p><span class="font-medium">User ID:</span> {$user?.uid}</p>
        </div>
    </div>
</div>