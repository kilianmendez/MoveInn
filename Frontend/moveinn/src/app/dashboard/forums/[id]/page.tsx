'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import {
  API_ALL_FORUMS,
  API_FORUM_THREADS_BY_FORUM_ID,
} from '@/utils/endpoints/config'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const categoryLabels: Record<number, string> = {
  0: 'Procedures & Docs',
  1: 'University Life',
  2: 'Cultural & Social',
  3: 'Scholarships',
  4: 'Transport',
  5: 'Tourism & Nightlife',
  6: 'Events',
  7: 'Tips',
  8: 'FAQ',
  9: 'Other',
}

const forumCategoryBadgeColors: Record<number, string> = {
  0: 'bg-green-600 text-white',
  1: 'bg-blue-600 text-white',
  2: 'bg-pink-600 text-white',
  3: 'bg-yellow-600 text-white',
  4: 'bg-purple-600 text-white',
  5: 'bg-rose-600 text-white',
  6: 'bg-orange-600 text-white',
  7: 'bg-teal-600 text-white',
  8: 'bg-gray-700 text-white',
  9: 'bg-gray-500 text-white',
}

export default function ForumDetailPage() {
  const { id } = useParams()
  const [forum, setForum] = useState<any | null>(null)
  const [threads, setThreads] = useState<any[]>([])
  const [newThread, setNewThread] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchForum = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(API_ALL_FORUMS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const forums = response.data
      const matchedForum = forums.find((f: any) => f.id === id)
      setForum(matchedForum || null)
    } catch (error) {
      console.error('Error fetching forums:', error)
      setForum(null)
    }
  }

  const fetchThreads = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(API_FORUM_THREADS_BY_FORUM_ID(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setThreads(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Error fetching threads:', error)
    }
  }

  const handleSubmit = async () => {
    if (!newThread.trim()) return
    try {
      setIsSubmitting(true)
      const token = localStorage.getItem('token')
      await axios.post(
        `${API_FORUM_THREADS_BY_FORUM_ID(id)}`,
        {
          content: newThread,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setNewThread('')
      fetchThreads()
    } catch (error) {
      console.error('Error creating thread:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchForum()
      fetchThreads()
    }
  }, [id])

  if (!forum) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading forum details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E7ECF0]/30 py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Forum Card */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge
              className={`text-sm px-3 py-1 rounded-full ${
                forumCategoryBadgeColors[forum.category] ||
                'bg-gray-300 text-gray-800'
              }`}
            >
              {categoryLabels[forum.category] || 'Other'}
            </Badge>
            <span className="text-sm text-gray-500">
              {format(new Date(forum.createdAt), 'PPP')}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#0E1E40] mb-4">{forum.title}</h1>

          <div className="flex items-center text-sm text-gray-600 mb-6">
            <MapPin className="h-4 w-4 mr-1 text-[#4C69DD]" />
            {forum.country}
          </div>

          <p className="text-gray-700 whitespace-pre-line mb-6">{forum.description}</p>

          <div className="flex items-center gap-3 mt-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src={forum.creatorAvatar} />
              <AvatarFallback>{forum.creatorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-[#0E1E40]">
              {forum.creatorName}
            </span>
          </div>
          {/* New Thread Composer */}
        <div className="bg-white border-t mt-9 pt-6">
          <Textarea
            value={newThread}
            onChange={(e) => setNewThread(e.target.value)}
            placeholder="Share something with the community..."
            className="mb-3 text-primary-dark"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Thread'}
            </Button>
          </div>
        </div>
        </div>

        

        {/* Threads */}
        <div className="space-y-4">
          {threads.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No threads yet.</p>
          ) : (
            threads.map((thread) => (
              <div
                key={thread.id}
                className="bg-white shadow-sm rounded-md p-4 border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={thread.creatorAvatar} />
                    <AvatarFallback>
                      {thread.creatorName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium text-[#0E1E40]">
                    {thread.creatorName}
                  </div>
                  <span className="text-xs text-gray-500 ml-auto">
                    {format(new Date(thread.createdAt), 'PPPp')}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{thread.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
