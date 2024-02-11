import { format } from "date-fns/format"
import { nextSaturday } from "date-fns/nextSaturday"
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react"

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/shad/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shad/ui/avatar"
import { Button } from "@/components/shad/ui/button"
import { Calendar } from "@/components/shad/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/shad/ui/dropdown-menu"
import { Label } from "@/components/shad/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shad/ui/popover"
import { Separator } from "@/components/shad/ui/separator"
import { Switch } from "@/components/shad/ui/switch"
import { Textarea } from "@/components/shad/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shad/ui/tooltip"
import MailInterface from "@/lib/interfaces/mail"
import { FunctionComponent, useRef } from "react"
import MailService from "@/lib/services/mail"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import * as utils from "../utils"
import MailTooltip from "./tooltips"
import { MailSenderProfile } from "./profile"

export const MailDisplay: FunctionComponent<{
  mail: MailInterface.MailSent.Fetch
  mailReceived: MailInterface.MailReceived.Fetch
}> = ({ mail, mailReceived }) => {
  const replyToRef = useRef<HTMLTextAreaElement | null>(null)
  const queryClient = useQueryClient()
  const router = useRouter()

  const invalidate = () => {
    utils.invalidate({
      mailSent: mail,
      mailReceived,
      router,
      queryClient
    })
  }

  const markMailAsUnread = async () => {
    utils.markMailAsUnread(mailReceived)
    invalidate()
  }

  const starMail = async () => {
    utils.starMail(mailReceived)
    invalidate()
  }

  const unMuteMail = async () => {
    utils.unMuteMail(mailReceived)
    invalidate()
  }

  const muteMail = async () => {
    utils.muteMail(mailReceived)
    invalidate()
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          {mailReceived.data.folder === "TRASH" && (
            <MailTooltip.Inbox
              mailReceived={mailReceived}
              mail={mail}
              invalidate={invalidate}
            />
          )}
          <MailTooltip.Archive
            mailReceived={mailReceived}
            mail={mail}
            invalidate={invalidate}
          />
          <MailTooltip.Spam
            mailReceived={mailReceived}
            mail={mail}
            invalidate={invalidate}
          />
          {mailReceived.data.folder !== "TRASH" && (
            <MailTooltip.Trash
              mailReceived={mailReceived}
              mail={mail}
              invalidate={invalidate}
            />
          )}
          <Separator orientation="vertical" className="mx-1 h-6" />
          <MailTooltip.Snooze
            mailReceived={mailReceived}
            mail={mail}
            invalidate={invalidate}
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={!mail}
                onClick={() => replyToRef.current?.focus()}
              >
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost"
                size="icon"
                disabled={!mail}
                onClick={() => replyToRef.current?.focus()}
              >
                <ReplyAll className="h-4 w-4" />
                <span className="sr-only">Reply all</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail}>
                <Forward className="h-4 w-4" />
                <span className="sr-only">Forward</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!mail}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => markMailAsUnread()}
            >
              Mark as unread
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => starMail()}
            >
              Star
            </DropdownMenuItem>
            {mailReceived.data.isMuted ? (
              <DropdownMenuItem
                onClick={() => unMuteMail()}
              >
                Unmute
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => muteMail()}
              >
                Mute
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start p-4">
          <div className="flex items-start gap-4 text-sm">
            <MailSenderProfile mail={mail} />
            <div className="grid gap-1">
              <div className="font-semibold">{mail.data.subject}</div>
              <div className="line-clamp-1 text-xs">
                <span className="font-medium">From:</span> {mail.data.senderEmail}
              </div>
              <div className="line-clamp-1 text-xs">
                <span className="font-medium">Reply-To:</span> {mail.data.senderEmail}
              </div>
            </div>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {format(new Date(mail.data.sentAt), "PPpp")}
          </div>
        </div>
        <Separator />
        <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
          {mail.data.body}
        </div>
        <Separator className="mt-auto" />
        <div className="p-4">
          <form>
            <div className="grid gap-4">
              <Textarea
                ref={replyToRef}
                className="p-4"
                placeholder={`Reply ${mail.data.senderEmail}`}
              />
              <div className="flex items-center">
                <Label
                  htmlFor="mute"
                  className="flex items-center gap-2 text-xs font-normal"
                >
                  <Switch id="mute" aria-label="Mute thread" /> Mute this
                  thread
                </Label>
                <Button
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                  className="ml-auto"
                >
                  Send
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
