<template>
  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <!-- Referencing to "github" variable-->
          <a :href="github" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github fa-2x" aria-hidden="true"></i>
          </a>
          <!-- Referencing to "linkedin" variable-->
          <a :href="linkedin" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin-in fa-2x" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //Variables
      github: "https://github.com/marcoref3at",
      linkedin: "https://linkedin.com/in/marcoref3at",
    };
  },
};
</script>
