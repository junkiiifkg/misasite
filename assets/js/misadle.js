/* MISA Esports - Misadle (Wordle Clone) */

const MISADLE = {
  MAX_GUESSES: 6,
  WORD_LENGTH: 5,
  currentRow: 0,
  currentCol: 0,
  guesses: [],
  answer: '',
  gameOver: false,
  keyStates: {},

  init() {
    this.answer = this.getTodaysWord();
    this.loadState();
    this.renderBoard();
    this.renderKeyboard();
    this.bindEvents();
    if (this.gameOver) {
      const won = this.guesses.length > 0 && this.guesses[this.guesses.length - 1] === this.answer;
      const msg = won ? `Excellent! ${this.currentRow}/${this.MAX_GUESSES}` : `The word was ${this.answer}`;
      this.showMessage(msg, true);
      this.showShareButton();
    }
  },

  getTodaysWord() {
    const startDate = new Date('2026-03-01');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayIndex = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const words = MISA_DATA.misadle.words;
    return words[Math.abs(dayIndex) % words.length];
  },

  loadState() {
    try {
      const saved = localStorage.getItem('misa_misadle_state');
      if (saved) {
        const state = JSON.parse(saved);
        const today = new Date().toISOString().split('T')[0];
        if (state.date === today) {
          // Restore state
          state.guesses.forEach(guess => {
            this.guesses.push(guess);
            this.currentRow++;
          });
          if (state.solved || this.currentRow >= this.MAX_GUESSES) {
            this.gameOver = true;
          }
          // Rebuild key states
          state.guesses.forEach(guess => {
            const result = this.evaluate(guess);
            for (let i = 0; i < this.WORD_LENGTH; i++) {
              const letter = guess[i];
              const state = result[i];
              if (state === 'correct') this.keyStates[letter] = 'correct';
              else if (state === 'present' && this.keyStates[letter] !== 'correct') this.keyStates[letter] = 'present';
              else if (state === 'absent' && !this.keyStates[letter]) this.keyStates[letter] = 'absent';
            }
          });
        }
      }
    } catch (e) { /* ignore */ }
  },

  saveState() {
    const today = new Date().toISOString().split('T')[0];
    const solved = this.guesses.length > 0 && this.guesses[this.guesses.length - 1] === this.answer;
    localStorage.setItem('misa_misadle_state', JSON.stringify({
      date: today,
      guesses: this.guesses,
      solved
    }));
  },

  evaluate(guess) {
    const result = Array(this.WORD_LENGTH).fill('absent');
    const answerLetters = [...this.answer];

    // First pass: correct positions
    for (let i = 0; i < this.WORD_LENGTH; i++) {
      if (guess[i] === this.answer[i]) {
        result[i] = 'correct';
        answerLetters[i] = null;
      }
    }
    // Second pass: present but wrong position
    for (let i = 0; i < this.WORD_LENGTH; i++) {
      if (result[i] === 'absent') {
        const idx = answerLetters.indexOf(guess[i]);
        if (idx !== -1) {
          result[i] = 'present';
          answerLetters[idx] = null;
        }
      }
    }
    return result;
  },

  renderBoard() {
    const board = document.getElementById('misadle-board');
    if (!board) return;

    let html = '';
    for (let r = 0; r < this.MAX_GUESSES; r++) {
      html += '<div class="flex gap-1.5 justify-center">';
      for (let c = 0; c < this.WORD_LENGTH; c++) {
        const letter = this.guesses[r] ? this.guesses[r][c] : '';
        let stateClass = 'bg-surface-container-high border-2 border-outline-variant/30 text-on-surface';

        if (this.guesses[r]) {
          const result = this.evaluate(this.guesses[r]);
          if (result[c] === 'correct') stateClass = 'bg-primary text-on-primary border-2 border-primary';
          else if (result[c] === 'present') stateClass = 'bg-on-surface-variant/30 text-on-surface border-2 border-on-surface-variant/50';
          else stateClass = 'bg-surface-container-highest text-on-surface/40 border-2 border-outline-variant/10';
        }

        // Current row, typed but not submitted
        if (r === this.currentRow && !this.guesses[r] && c < this.currentCol) {
          const currentGuess = this.getCurrentGuess();
          html += `<div class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-headline font-black text-xl md:text-2xl uppercase rounded-lg bg-surface-container-high border-2 border-primary/50 text-on-surface tile-pop">${currentGuess[c] || ''}</div>`;
        } else {
          html += `<div class="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-headline font-black text-xl md:text-2xl uppercase rounded-lg ${stateClass} ${this.guesses[r] ? 'tile-flip' : ''}" style="${this.guesses[r] ? `animation-delay: ${c * 0.15}s` : ''}">${letter}</div>`;
        }
      }
      html += '</div>';
    }
    board.innerHTML = html;
  },

  getCurrentGuess() {
    return this._currentInput || '';
  },

  renderKeyboard() {
    const kb = document.getElementById('misadle-keyboard');
    if (!kb) return;

    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    kb.innerHTML = rows.map(row => `
      <div class="flex gap-1 md:gap-1.5 justify-center">
        ${row.map(key => {
          let stateClass = 'bg-surface-container-high text-on-surface hover:bg-surface-bright';
          if (this.keyStates[key] === 'correct') stateClass = 'bg-primary text-on-primary';
          else if (this.keyStates[key] === 'present') stateClass = 'bg-on-surface-variant/40 text-on-surface';
          else if (this.keyStates[key] === 'absent') stateClass = 'bg-surface-container-lowest text-on-surface/30';

          const isWide = key === 'ENTER' || key === '⌫';
          const ariaLabel = key === '⌫' ? 'Backspace' : key === 'ENTER' ? 'Submit guess' : key;
          return `<button data-key="${key}" aria-label="${ariaLabel}" class="misadle-key ${isWide ? 'px-3 md:px-4' : 'w-10 md:w-11'} h-12 md:h-14 rounded-lg font-headline font-bold text-xs md:text-sm transition-all active:scale-90 ${stateClass}">${key}</button>`;
        }).join('')}
      </div>
    `).join('');
  },

  bindEvents() {
    this._currentInput = '';

    // Keyboard clicks
    document.getElementById('misadle-keyboard')?.addEventListener('click', (e) => {
      const key = e.target.closest('.misadle-key')?.dataset.key;
      if (key) this.handleKey(key);
    });

    // Physical keyboard
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') this.handleKey('ENTER');
      else if (e.key === 'Backspace') this.handleKey('⌫');
      else if (/^[a-zA-Z]$/.test(e.key)) this.handleKey(e.key.toUpperCase());
    });
  },

  handleKey(key) {
    if (this.gameOver) return;

    if (key === '⌫') {
      if (this._currentInput.length > 0) {
        this._currentInput = this._currentInput.slice(0, -1);
        this.currentCol = this._currentInput.length;
        this.renderBoard();
      }
    } else if (key === 'ENTER') {
      if (this._currentInput.length === this.WORD_LENGTH) {
        this.submitGuess();
      } else {
        this.shakeRow();
        this.showMessage('Not enough letters');
      }
    } else if (this._currentInput.length < this.WORD_LENGTH) {
      this._currentInput += key;
      this.currentCol = this._currentInput.length;
      this.renderBoard();
    }
  },

  submitGuess() {
    const guess = this._currentInput.toUpperCase();

    // Check if valid guess
    if (!MISA_DATA.misadle.validGuesses.includes(guess) && !MISA_DATA.misadle.words.includes(guess)) {
      this.shakeRow();
      this.showMessage('Not in word list');
      return;
    }

    this.guesses.push(guess);
    const result = this.evaluate(guess);

    // Update key states
    for (let i = 0; i < this.WORD_LENGTH; i++) {
      const letter = guess[i];
      const state = result[i];
      if (state === 'correct') this.keyStates[letter] = 'correct';
      else if (state === 'present' && this.keyStates[letter] !== 'correct') this.keyStates[letter] = 'present';
      else if (state === 'absent' && !this.keyStates[letter]) this.keyStates[letter] = 'absent';
    }

    this._currentInput = '';
    this.currentCol = 0;
    this.currentRow++;

    this.renderBoard();
    this.renderKeyboard();
    this.saveState();

    // Check win/lose
    if (guess === this.answer) {
      this.gameOver = true;
      setTimeout(() => {
        this.showMessage(`Excellent! ${this.currentRow}/${this.MAX_GUESSES}`, true);
        this.showShareButton();
      }, 500);
      this.saveToLeaderboard(true);
    } else if (this.currentRow >= this.MAX_GUESSES) {
      this.gameOver = true;
      setTimeout(() => {
        this.showMessage(`The word was ${this.answer}`, true);
        this.showShareButton();
      }, 500);
      this.saveToLeaderboard(false);
    }
  },

  shakeRow() {
    const board = document.getElementById('misadle-board');
    if (!board) return;
    const rows = board.children;
    if (rows[this.currentRow]) {
      rows[this.currentRow].classList.add('shake');
      setTimeout(() => rows[this.currentRow]?.classList.remove('shake'), 500);
    }
  },

  showMessage(text, persistent = false) {
    const msgEl = document.getElementById('misadle-message');
    if (!msgEl) return;
    msgEl.textContent = text;
    msgEl.classList.remove('opacity-0');
    msgEl.classList.add('opacity-100');
    if (!persistent) {
      setTimeout(() => {
        msgEl.classList.remove('opacity-100');
        msgEl.classList.add('opacity-0');
      }, 2000);
    }
  },

  saveToLeaderboard(won) {
    try {
      const lb = JSON.parse(localStorage.getItem('misa_leaderboard') || '{}');
      if (!lb.misadle) lb.misadle = [];
      const today = new Date().toISOString().split('T')[0];
      // Don't duplicate
      if (!lb.misadle.find(e => e.date === today)) {
        const name = localStorage.getItem('misa_username') || 'Guest';
        lb.misadle.push({
          name,
          score: won ? (this.MAX_GUESSES - this.currentRow + 1) * 10 : 0,
          guesses: this.currentRow,
          won,
          date: today
        });
        localStorage.setItem('misa_leaderboard', JSON.stringify(lb));
      }
    } catch (e) { /* ignore */ }
  },

  showShareButton() {
    const msgEl = document.getElementById('misadle-message');
    if (!msgEl) return;
    const btn = document.createElement('button');
    btn.className = 'ml-3 inline-flex items-center gap-1 gold-gradient text-on-primary font-headline font-bold text-xs px-4 py-1.5 rounded-md tracking-widest uppercase active:scale-95 transition-all';
    btn.innerHTML = '<span class="material-symbols-outlined text-sm">share</span> SHARE';
    btn.addEventListener('click', () => this.shareResult());
    msgEl.appendChild(btn);
  },

  shareResult() {
    const won = this.guesses.length > 0 && this.guesses[this.guesses.length - 1] === this.answer;
    const dayNum = Math.floor((new Date().setHours(0,0,0,0) - new Date('2026-03-01').getTime()) / 86400000);
    let text = `MISADLE #${dayNum} ${won ? this.currentRow : 'X'}/${this.MAX_GUESSES}\n\n`;
    this.guesses.forEach(guess => {
      const result = this.evaluate(guess);
      text += result.map(r => r === 'correct' ? '\u{1F7E8}' : r === 'present' ? '\u{2B1C}' : '\u{2B1B}').join('') + '\n';
    });
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showMessage('Copied to clipboard!');
      });
    }
  }
};
