'use strict';
const examples = {
  writing: { basic: 'Write an email.', better: 'Write a friendly follow-up email to a potential client after our first call. Recap the website redesign we discussed, suggest a 20-minute call next week, and keep it under 120 words. Avoid sales jargon.' },
  planning: { basic: 'Make me a plan.', better: 'Create a 7-day launch plan for my handmade stationery shop. I have 1 hour a day, a small Instagram audience, and a ₹3,000 budget. Use a table with one priority, action, and success measure for each day. Ask about any missing essentials first.' },
  learning: { basic: 'Explain AI to me.', better: 'Explain how a language model works to a complete beginner. Use a simple everyday analogy, define any technical terms, and include one limitation. Keep it under 200 words, then ask me three questions to check my understanding.' }
};
document.querySelectorAll('[data-scenario]').forEach(button => {
  button.addEventListener('click', () => {
    const example = examples[button.dataset.scenario];
    document.getElementById('basic-prompt').textContent = example.basic;
    document.getElementById('better-prompt').textContent = example.better;
    document.getElementById('copy-status').textContent = '';
    document.querySelectorAll('[data-scenario]').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
  });
});
document.getElementById('copy-prompt').addEventListener('click', async () => {
  const prompt = document.getElementById('better-prompt');
  try {
    await navigator.clipboard.writeText(prompt.textContent);
    document.getElementById('copy-status').textContent = 'Copied. Try it in your favorite assistant.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(prompt);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.getElementById('copy-status').textContent = 'Text selected. Press Ctrl+C or use your device’s copy action.';
  }
});
[['enrollment-button', 'enrollment-dialog'], ['privacy-button', 'privacy-dialog']].forEach(([buttonId, dialogId]) => {
  const dialog = document.getElementById(dialogId);
  document.getElementById(buttonId).addEventListener('click', () => dialog.showModal());
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
});
document.getElementById('ollama-link').addEventListener('click', () => {
  document.querySelectorAll('.module-list details')[4].open = true;
});
