<script lang="ts">
    import { user } from '$lib/stores/authStore';
</script>

<div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center space-x-4 mb-6">
            <img src={$user?.photoURL} alt="Profile" class="w-20 h-20 rounded-full"/>
            <div>
                <h1 class="text-2xl font-bold">{$user?.displayName}</h1>
                <p class="text-gray-600">{$user?.email}</p>
            </div>
        </div>
    </div>
</div>