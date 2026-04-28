# Zynq Custom DAQ Architecture Documentation

An interactive React dashboard detailing the hardware, software, and electromagnetic constraints for interfacing a custom 1.0V/100MHz IC with Xilinx Zynq-7000 (ZedBoard) and Zynq UltraScale+ (ZCU102) development boards via VITA 57.1 FMC.

## Run Locally
1. `npm install`
2. `npm run dev`

## Architecture Highlights
* **Data Path:** 100MHz Source-Synchronous -> ISERDES -> FSM -> AXI SG-DMA -> LwIP/FreeRTOS -> MATLAB.
* **Signal Integrity:** On-die 1.8V CMOS IO pad ring biasing to satisfy UltraScale+ HP Bank $V_{IH}$ thresholds.
* **Power Sequencing:** IPMI FRU EEPROM programming via CH341A (off-chip) to safely negotiate $V_{ADJ}$.
