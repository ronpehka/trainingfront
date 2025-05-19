
<template>
<div class="alert alert-warning" role="alert">
  siia tuleb error
</div>
</template>

<script>
export default {
  name: 'AlertError',
  props: {
    errorMessage: String,
  }
}
</script>
