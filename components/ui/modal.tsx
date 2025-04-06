import React, { ReactNode } from "react"
import { Button } from "@/components/ui/button"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Insight AI Chat</h2>
          <Button onClick={onClose} className="text-xl">X</Button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export { Modal }
