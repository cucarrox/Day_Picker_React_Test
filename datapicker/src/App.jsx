import React, { useState } from 'react';

// ====== LIBS ======
import * as Popover from '@radix-ui/react-popover'; // RADIX
import { DayPicker } from 'react-day-picker'; // DATEPICKER
import 'react-day-picker/dist/style.css';     // DATEPICKER

import { Calendar } from '@phosphor-icons/react'; // ICONS
import "react-day-picker/dist/style.css";

function App() {

  // Seta um range escolhido
  const [selectedRange, setSelectedRange] = useState({ from: undefined, to: undefined })

  // Abre e fecha o popover
  const [popoverOpen, popoverClose] = useState(false)

  // Seleciona o Range
  const selecionarData = (range) => {
    setSelectedRange(range || { from: undefined, to: undefined })
  }

  // Mostra a data no botão
  const formatDate = (date) => date ? date.toLocaleDateString() : 'Selecione a data';

  // Permite a exibição das datas no <span>
  const returnButton = () => {
    if (selectedRange.from && selectedRange.to) {
      return `${formatDate(selectedRange.from)} - ${formatDate(selectedRange.to)}`
    }
    return 'Selecione a data'
  }

  const PopoverDate = () => (
    <Popover.Root open={popoverOpen} onOpenChange={popoverClose}>
      <Popover.Trigger asChild className='flex items-center space-x-2 px-4 py-2 bg-[#b5f110] hover:bg-[#b2dd3d] transition text-black rounded-md font-semibold'>
        <button onClick={() => popoverClose(!popoverOpen)} className="flex items-center">
          <Calendar size={32} />
          <span className="ml-2">{returnButton()}</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5}>
          <div className='w-full h-full p-4 bg-white rounded-lg shadow-lg'>
            <DayPicker
              initialFocus
              mode="range"
              defaultMonth={selectedRange.from}
              selected={selectedRange}
              onSelect={selecionarData}
              numberOfMonths={2}
              pagedNavigation
              fixedWeeks
              classNames={{
                day_selected: "bg-[#F7FEE6] hover:border-[#B0F001] focus:border-[#B0F001] !important",
                day_range_start: "border-[#B0F001]",
                day_range_end: "border-[#B0F001]",
                day: "rounded-[10px] m-[2px] w-10 h-10",
              }}
            />
            <div className="flex justify-end mt-2">
              <Popover.Close className="px-4 py-2 bg-green-500 text-white rounded-md">
                Confirmar
              </Popover.Close>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <PopoverDate />
    </div>
  )
}

export default App;
