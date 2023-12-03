<script>
  import Flatpickr from 'svelte-flatpickr'
  import 'flatpickr/dist/flatpickr.css'

  import { t } from "$lib/tailwind.js"

  /** @type {string} */
  export let value

  /** @type {string} */
  export let name
</script>

<Flatpickr
  dateFormat="Y-m-d"
  element="#date-picker"
>
  <div class="flatpickr" id="date-picker">
    <div class="input-group">
      <input
        type="text"
        name="{name}"
        value={value || ''}
        class={t.input}
        data-input
      />
      <button type="button" class="input-button {t.cancel_button}" title="Clear" data-clear>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
          />
        </svg>
      </button>
    </div>
  </div>
</Flatpickr>

<style>
  .input-group {
      position: relative;
  }

  button.input-button {
      position: absolute;
      top: 1px;
      right: 1px;
      height: 96%;
      z-index: 0;
      border: none;
      cursor: pointer;
  }
</style>
