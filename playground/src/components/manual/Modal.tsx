import { useEffect, useId, useRef } from "react"
import type { KeyboardEvent, ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const focusableSelector = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",")

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return

    previousFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const focusableElements =
      modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector)
    const firstFocusable = Array.from(focusableElements ?? []).find(
      (element) =>
        !element.matches(":disabled") &&
        !element.closest("[hidden], [inert], [aria-hidden='true']"),
    )
    firstFocusable?.focus()
    if (!firstFocusable) modalRef.current?.focus()

    return () => {
      previousFocus.current?.focus()
      previousFocus.current = null
    }
  }, [isOpen])

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key !== "Tab") return

    const focusableElements = Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    ).filter(
      (element) =>
        !element.matches(":disabled") &&
        !element.closest("[hidden], [inert], [aria-hidden='true']"),
    )

    if (focusableElements.length === 0) {
      event.preventDefault()
      modalRef.current?.focus()
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (
      event.shiftKey &&
      (document.activeElement === firstElement ||
        !modalRef.current?.contains(document.activeElement))
    ) {
      event.preventDefault()
      lastElement.focus()
    } else if (
      !event.shiftKey &&
      (document.activeElement === lastElement ||
        !modalRef.current?.contains(document.activeElement))
    ) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={handleKeyDown}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl outline-none"
      >
        <h2 id={titleId} className="mb-4 text-xl font-bold">
          Manual Modal
        </h2>
        <p className="mb-4">
          Press Tab to cycle through buttons. Press Escape to close.
        </p>
        {children}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
