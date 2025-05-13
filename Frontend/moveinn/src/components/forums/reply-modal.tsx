import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function ReplyModal({ trigger, onSubmit }: { trigger: React.ReactNode, onSubmit: (content: string) => void }) {
  const [replyContent, setReplyContent] = useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <h4 className="text-lg font-semibold text-primary-dark">Reply</h4>
        <Textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Write your reply..."
          className="text-sm"
          rows={4}
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={() => {
              onSubmit(replyContent)
              setReplyContent('')
            }}
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
