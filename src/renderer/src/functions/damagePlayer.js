import { useGameStore } from '../stores/gameStore'

export const damagePlayer = (amount) => {
  const game = useGameStore()

  game.player.currentHealth -= amount
}
