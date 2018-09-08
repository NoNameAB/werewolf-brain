/* eslint-disable no-console */
const assert = require('assert');
const cards = require('./src/cards');
const decks = require('./src/decks');
const moderator = require('./src/moderator');
const game = require('./src/game');
const languages = require('./src/languages');

exports.getCards = cards.getAll;
exports.getDecks = decks.getAll;
exports.getModes = game.mode;
exports.getDeck = decks.get;
exports.getScriptFromDeck = moderator.getScriptFromDeck;
exports.getLanguages = languages.getLanguages;
exports.translateDeck = languages.translateDeck;
exports.translations = require('./src/data/translations');

exports.filterLevels = moderator.levels;

exports.getGame = (players, options = {}) => {
    const language = options.language || 'en';
    const mode = options.mode || game.mode.NORMAL;
    const { deck } = options;
    const deckName = options.deckName || (deck ? 'custom' : 'all');

    assert(players > 0, 'Players must be greater than 0.');

    if (deck) {
        return game.create(players, language, cards.inCustomDeck(deck), mode);
    }

    assert(!options.deckName || decks.exists(deckName), `Deck ${deckName} is not defined.`);
    return game.create(players, language, cards.inDeck(deckName), mode);
};
