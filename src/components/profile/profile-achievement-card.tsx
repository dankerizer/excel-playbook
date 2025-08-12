"use client";

import { Badge } from "../ui/badge";
import { motion } from "framer-motion"

interface UserAchievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

/**
 * Mendapatkan warna badge berdasarkan rarity
 */
function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    case 'rare': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'epic': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'legendary': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
}



/**
 * Format tanggal dalam bahasa Indonesia
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function ProfileAchievementCard({achievement,index}:{achievement: UserAchievement,index:number}) {
  return (
     <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-center mb-3">
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {achievement.title}
                          </h3>
                          <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Diraih pada {formatDate(achievement.unlockedAt)}
                        </p>
                      </div>
                    </motion.div>
  )
}