import React, { useState } from 'react';
import { Cpu, Server, Network, Activity, BookOpen, ExternalLink, ArrowRight, Layers, MemoryStick, Database, Plug, Link, Zap, ShieldAlert, CheckCircle, Terminal, HardDrive, PenTool } from 'lucide-react';
const Microchip = Cpu;
const MicrochipIcon = Cpu;

// --- Reusable Components ---

const TopBar = () => (
  <div className="bg-slate-900 border-b border-slate-700 p-4 text-slate-200 text-sm shadow-md">
    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
      <div className="font-bold text-blue-400 mb-2 md:mb-0 flex items-center">
        <BookOpen className="w-4 h-4 mr-2" />
        Reference Project Quick Links:
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="https://github.com/wangshuoleon/A-high-speed-data-acquisition-framework" target="_blank" rel="noreferrer" className="flex items-center hover:text-blue-300 transition-colors">
          <ExternalLink className="w-3 h-3 mr-1" /> 100MHz DAQ LwIP Framework
        </a>
        <a href="https://github.com/fpgadeveloper/ethernet-fmc-zynq-gem" target="_blank" rel="noreferrer" className="flex items-center hover:text-blue-300 transition-colors">
          <ExternalLink className="w-3 h-3 mr-1" /> Ethernet FMC Zynq GEM
        </a>
        <a href="https://github.com/Hamid-R-Tanhaei/ZYNQ_ADC_DMA_LWIP" target="_blank" rel="noreferrer" className="flex items-center hover:text-blue-300 transition-colors">
          <ExternalLink className="w-3 h-3 mr-1" /> ZYNQ ADC DMA FreeRTOS
        </a>
        <a href="https://github.com/analogdevicesinc/hdl" target="_blank" rel="noreferrer" className="flex items-center hover:text-blue-300 transition-colors">
          <ExternalLink className="w-3 h-3 mr-1" /> ADI HDL (IDELAY/ISERDES)
        </a>
      </div>
    </div>
  </div>
);

const BlockDiagram = ({ title, nodes }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 my-6 overflow-x-auto">
    <h3 className="text-lg font-semibold text-blue-400 mb-6">{title}</h3>
    <div className="flex items-center space-x-2 min-w-max pb-4">
      {nodes.map((node, idx) => (
        <React.Fragment key={idx}>
          <div className="flex flex-col items-center bg-slate-900 border border-slate-600 rounded p-4 w-40 text-center shadow-lg relative group">
            <div className="text-blue-400 mb-2">{node.icon}</div>
            <div className="text-sm font-bold text-slate-200">{node.label}</div>
            <div className="text-xs text-slate-400 mt-1">{node.desc}</div>
            {/* Tooltip */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs p-2 rounded -bottom-12 left-1/2 transform -translate-x-1/2 w-48 z-10 pointer-events-none">
              {node.tooltip}
            </div>
          </div>
          {idx < nodes.length - 1 && (
            <div className="flex flex-col items-center justify-center w-16 text-slate-500">
              <span className="text-[10px] font-mono leading-tight whitespace-nowrap mb-1 text-slate-400">
                {nodes[idx].edge}
              </span>
              <ArrowRight className="w-6 h-6" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('eeprom');

  const tabs = [
    { id: 'zedboard', label: 'ZedBoard (Zynq-7000)', icon: <Layers className="w-4 h-4 mr-2" /> },
    { id: 'zcu102', label: 'ZCU102 (UltraScale+)', icon: <Cpu className="w-4 h-4 mr-2" /> },
    { id: 'projects', label: 'Design Strategy & Projects', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { id: 'fmc', label: 'VITA 57.1 Pinouts', icon: <Plug className="w-4 h-4 mr-2" /> },
    { id: 'signal', label: '1V Logic & Signal Integrity', icon: <Zap className="w-4 h-4 mr-2" /> },
    { id: 'eeprom', label: 'IPMI EEPROM / VADJ', icon: <HardDrive className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <TopBar />
      
      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 shadow-xl sticky top-8">
            <h1 className="text-xl font-bold text-white mb-6 tracking-tight">DAQ Architecture Hub</h1>
            <nav className="flex flex-col space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          
          {/* ----------------- ZEDBOARD TAB ----------------- */}
          {activeTab === 'zedboard' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-2">ZedBoard Architecture (Zynq-7000)</h2>
                <p className="text-slate-400">
                  Targeting the 28nm Zynq-7000 SoC fabric. This board provides a VITA 57.1 LPC connector mapped entirely to standard Artix-7 fabric I/O, lacking serial transceivers but capable of robust source-synchronous parallel capture.
                </p>

                <BlockDiagram 
                  title="ZedBoard Data Flow Pipeline"
                  nodes={[
                    { label: "Custom IC", desc: "100MHz + 3 Data", edge: "VITA 57.1 LPC", icon: <Cpu className="w-6 h-6"/>, tooltip: "Must match VADJ (Jumper J18)" },
                    { label: "PL Front-End", desc: "IDELAYE2 & ISERDESE2", edge: "Parallel Data", icon: <Activity className="w-6 h-6"/>, tooltip: "BUFIO for SerDes, BUFR for fabric clock." },
                    { label: "Capture FSM", desc: "AXI4-Stream Wrapped", edge: "TVALID/TLAST", icon: <Layers className="w-6 h-6"/>, tooltip: "FSM buffers to Block RAM (BRAM)." },
                    { label: "AXI DMA", desc: "Scatter-Gather Mode", edge: "AXI HP Port", icon: <MemoryStick className="w-6 h-6"/>, tooltip: "Chained descriptors write to DDR3." },
                    { label: "PS Subsystem", desc: "PetaLinux / GEM0", edge: "TCP/UDP", icon: <Server className="w-6 h-6"/>, tooltip: "ARM Cortex-A9 mapping UIO buffers to network." },
                    { label: "MATLAB", desc: "tcpclient / udpport", edge: "", icon: <Network className="w-6 h-6"/>, tooltip: "Host PC running MATLAB receiving packets." }
                  ]}
                />

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-slate-800 p-5 rounded border border-slate-700">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <MemoryStick className="w-4 h-4 mr-2 text-blue-400" /> VADJ Electrical Warning
                    </h4>
                    <p className="text-sm leading-relaxed">
                      On the ZedBoard, the VADJ rail is <strong>not negotiated</strong> via I2C. It is statically set via jumper J18. 
                      You must manually verify J18 is set to 1.8V or 2.5V to match your custom IC before applying power. 3.3V requires physical board modification.
                    </p>
                  </div>
                  <div className="bg-slate-800 p-5 rounded border border-slate-700">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-blue-400" /> Clocking Architecture
                    </h4>
                    <p className="text-sm leading-relaxed">
                      The 100MHz forwarded clock must enter on a <code>CC</code> (Clock Capable) pin. In the 7-Series fabric, this clock drives a <code>BUFIO</code> to clock the <code>ISERDESE2</code> high-speed capture registers, and a <code>BUFR</code> to divide the frequency for the parallel logic.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- ZCU102 TAB ----------------- */}
          {activeTab === 'zcu102' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-2">ZCU102 Architecture (Zynq UltraScale+)</h2>
                <p className="text-slate-400">
                  Targeting the 16nm FinFET+ MPSoC. This platform features dual VITA 57.1 HPC connectors with embedded 16.3 Gbps GTH transceivers, massive URAM arrays, and strict software-defined VADJ power management.
                </p>

                <BlockDiagram 
                  title="ZCU102 High-Bandwidth Pipeline"
                  nodes={[
                    { label: "Custom IC", desc: "100MHz + IPMI EEPROM", edge: "VITA 57.1 HPC", icon: <Cpu className="w-6 h-6"/>, tooltip: "Requires FRU EEPROM for VADJ startup." },
                    { label: "PL Front-End", desc: "IDELAYE3 & ISERDESE3", edge: "Parallel Data", icon: <Activity className="w-6 h-6"/>, tooltip: "TIME mode IDELAY via picosecond constraints. BUFGCE_DIV used for clocking." },
                    { label: "Capture FSM", desc: "AXI4-Stream Wrapped", edge: "Wide Bus", icon: <Layers className="w-6 h-6"/>, tooltip: "FSM buffers to UltraRAM (URAM)." },
                    { label: "AXI DMA", desc: "Scatter-Gather Mode", edge: "CCI / HP Port", icon: <MemoryStick className="w-6 h-6"/>, tooltip: "128-bit/256-bit bus writes to DDR4." },
                    { label: "PS Subsystem", desc: "Cortex-A53 / GEM3", edge: "Zero-Copy UDP", icon: <Server className="w-6 h-6"/>, tooltip: "Jumbo frames active, UIO mem-mapped." },
                    { label: "MATLAB", desc: "DSP Toolbox", edge: "", icon: <Network className="w-6 h-6"/>, tooltip: "Large socket buffers absorbing raw throughput." }
                  ]}
                />

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-slate-800 p-5 rounded border border-slate-700">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Microchip className="w-4 h-4 mr-2 text-blue-400" /> MSP430 PMBUS Interrogation
                    </h4>
                    <p className="text-sm leading-relaxed">
                      The ZCU102 uses an onboard TI MSP430 to query the FMC's I2C bus at boot. <strong>If your custom IC carrier does not have an IPMI EEPROM, VADJ will remain isolated (0V).</strong> You must format an EEPROM or use the Xilinx SCUI software to manually override the PMBUS.
                    </p>
                  </div>
                  <div className="bg-slate-800 p-5 rounded border border-slate-700">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Database className="w-4 h-4 mr-2 text-blue-400" /> HPC1 Missing Pins
                    </h4>
                    <p className="text-sm leading-relaxed text-red-300">
                      <strong>Design Trap:</strong> On the ZCU102, pins <code>LA30</code>, <code>LA31</code>, and <code>LA32</code> on the HPC1 connector are physically unrouted. Do not route your 3 data lines to these LA pairs if you intend to use HPC1, otherwise the signals will terminate at an open circuit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------- PROJECTS STRATEGY TAB ----------------- */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4">Implementation Strategy & Reference Code</h2>
                <p className="text-slate-400 mb-8">
                  Building a 100MHz DAQ from scratch is mathematically error-prone. To achieve rapid prototype viability, synthesize the mechanical routing from the GEM examples, the DMA/LwIP structure from Wang and Tanhaei, and the silicon-level phase alignment from Analog Devices.
                </p>

                <div className="space-y-8">
                  
                  {/* Step 1 */}
                  <div className="relative pl-8 border-l-2 border-blue-500">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1"></div>
                    <h3 className="text-xl font-bold text-slate-200 mb-2">1. Establish the Network Baseline</h3>
                    <p className="text-sm text-slate-400 mb-3">
                      Before touching analog data, ensure your ARM processor can saturate the Gigabit link.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
                      <a href="https://github.com/fpgadeveloper/ethernet-fmc-zynq-gem" target="_blank" rel="noreferrer" className="text-blue-400 font-medium hover:underline flex items-center mb-2">
                        Repo: fpgadeveloper/ethernet-fmc-zynq-gem <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                      <p className="text-sm text-slate-300">
                        <strong>How to use this:</strong> Use this block design as your foundation. It configures the Zynq Processing System correctly for GEM0/GEM3, properly routing the RGMII interface constraints. Verify ping and iPerf3 across the network before adding custom PL logic.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative pl-8 border-l-2 border-purple-500">
                    <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-1"></div>
                    <h3 className="text-xl font-bold text-slate-200 mb-2">2. Construct the DMA & Software Pipeline</h3>
                    <p className="text-sm text-slate-400 mb-3">
                      High speed data demands Scatter-Gather (SG) DMA. Moving 300-600 Mbps will crush a CPU relying on Direct Register mode.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
                        <a href="https://github.com/wangshuoleon/A-high-speed-data-acquisition-framework" target="_blank" rel="noreferrer" className="text-blue-400 font-medium hover:underline flex items-center mb-2">
                          Repo: A-high-speed-data-acquisition-framework <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                        <p className="text-sm text-slate-300">
                          <strong>How to use this:</strong> Dissect their AXI DMA block design. Extract their LwIP server application logic which demonstrates how to wait for the UIO interrupt and blast the DDR memory payload over UDP/TCP to a MATLAB host.
                        </p>
                      </div>
                      <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
                        <a href="https://github.com/Hamid-R-Tanhaei/ZYNQ_ADC_DMA_LWIP" target="_blank" rel="noreferrer" className="text-blue-400 font-medium hover:underline flex items-center mb-2">
                          Repo: ZYNQ_ADC_DMA_LWIP <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                        <p className="text-sm text-slate-300">
                          <strong>Alternative approach:</strong> If PetaLinux's Yocto build time is a hindrance, this project utilizes FreeRTOS. It models a 72MHz ADC which perfectly mimics the physics of your 100MHz custom IC requirement.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative pl-8 border-l-2 border-emerald-500">
                    <div className="absolute w-4 h-4 bg-emerald-500 rounded-full -left-[9px] top-1"></div>
                    <h3 className="text-xl font-bold text-slate-200 mb-2">3. Master the Silicon Physics (IDELAY & ISERDES)</h3>
                    <p className="text-sm text-slate-400 mb-3">
                      At 100MHz DDR, your Unit Interval (UI) is 5ns. PCB trace delays and Process-Voltage-Temperature (PVT) shifts will destroy setup/hold times. You must actively tune the input delay.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
                      <a href="https://github.com/analogdevicesinc/hdl" target="_blank" rel="noreferrer" className="text-blue-400 font-medium hover:underline flex items-center mb-2">
                        Repo: analogdevicesinc/hdl <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                      <p className="text-sm text-slate-300 mb-2">
                        <strong>How to use this:</strong> Analog Devices provides production-grade VHDL/Verilog for dynamically tuning `IDELAYE2/E3` primitives. Instead of static PCB delay matching, use their logic to sweep the delay taps across the 3 data lines, finding the mathematical center of the data "eye" relative to your 100MHz forwarded clock. 
                      </p>
                      <p className="text-sm text-slate-300">
                        You will strip out the ADI specific ADC framing logic, and insert a custom FSM that monitors the `ISERDES` parallel output. Provide an AXI4-Lite control register so MATLAB can send a "Start Trigger" command to arm your FSM.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ----------------- FMC PINOUTS TAB ----------------- */}
          {activeTab === 'fmc' && (
            <div className="space-y-6 animate-fadeIn">
               <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 shadow-xl">
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">VITA 57.1 FMC Pinout References</h2>
                  <a href="https://www.vita.com/fmc" target="_blank" rel="noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium bg-slate-800 px-3 py-1.5 rounded border border-slate-700 transition-colors">
                    <Link className="w-4 h-4 mr-2" /> ANSI/VITA 57.1 Official Specification
                  </a>
                </div>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  As an Electrical Engineering researcher, keep in mind the physical layer transmission line models of ANSI/VITA 57.1. Signals are strictly defined by direction: Carrier-to-Mezzanine (<strong>C2M</strong>) or Mezzanine-to-Carrier (<strong>M2C</strong>). The standard dictates 100Ω differential impedance for the LA/HA/HB pairs. It requires careful routing to the Clock Capable (<strong>CC</strong>) pins to minimize picosecond skew in source-synchronous sampling interfaces.
                </p>

                {/* ZedBoard Section */}
                <div className="mb-8 border border-slate-700 rounded-lg overflow-hidden shadow-md">
                  <div className="bg-slate-800 p-4 border-b border-slate-700 flex flex-col md:flex-row justify-between md:items-center">
                    <h3 className="text-lg font-bold text-slate-200 flex items-center">
                      <Layers className="w-5 h-5 mr-2 text-blue-500" /> ZedBoard J1 Connector (LPC)
                    </h3>
                    <a href="https://digilent.com/reference/programmable-logic/zedboard/reference-manual" target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline flex items-center mt-2 md:mt-0">
                      <ExternalLink className="w-3 h-3 mr-1" /> Digilent Ref Manual
                    </a>
                  </div>
                  <div className="p-4 bg-slate-900/50">
                    <p className="text-sm text-slate-400 mb-4">
                      The ZedBoard implements a standard Low Pin Count (LPC) 160-pin array. It is mapped to 3.3V-capable High Range (HR) banks (Banks 34 & 35) on the Zynq-7020 fabric.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-300 border-collapse">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                          <tr>
                            <th className="px-4 py-3 border border-slate-700">FMC Signal Group</th>
                            <th className="px-4 py-3 border border-slate-700">Available Pins</th>
                            <th className="px-4 py-3 border border-slate-700">Physical / FPGA Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-700 bg-slate-900">
                            <td className="px-4 py-3 border border-slate-700 font-mono text-blue-300">LA[00:33]_P/N</td>
                            <td className="px-4 py-3 border border-slate-700">34 Diff Pairs (68 SE)</td>
                            <td className="px-4 py-3 border border-slate-700">Fully populated. Configurable to LVDS_25 or LVCMOS depending on your J18 VADJ jumper.</td>
                          </tr>
                          <tr className="border-b border-slate-700 bg-slate-900">
                            <td className="px-4 py-3 border border-slate-700 font-mono text-blue-300">CLK0_M2C, CLK1_M2C</td>
                            <td className="px-4 py-3 border border-slate-700">2 Diff Clock Pairs</td>
                            <td className="px-4 py-3 border border-slate-700">Mapped to Multi-Region Clock Capable (MRCC) pins. Crucial for your 100MHz forwarded clock entry point.</td>
                          </tr>
                          <tr className="bg-slate-900">
                            <td className="px-4 py-3 border border-slate-700 font-mono text-slate-500">DP, GBTCLK</td>
                            <td className="px-4 py-3 border border-slate-700 text-slate-500">0</td>
                            <td className="px-4 py-3 border border-slate-700 text-slate-500">The Zynq-7020 has no Gigabit transceivers routed to the PL/FMC.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* ZCU102 HPC0 Section */}
                <div className="mb-8 border border-slate-700 rounded-lg overflow-hidden shadow-md">
                  <div className="bg-slate-800 p-4 border-b border-slate-700 flex flex-col md:flex-row justify-between md:items-center">
                    <h3 className="text-lg font-bold text-slate-200 flex items-center">
                      <Cpu className="w-5 h-5 mr-2 text-purple-500" /> ZCU102 J5 Connector (HPC0)
                    </h3>
                    <a href="https://docs.xilinx.com/v/u/en-US/ug1182-zcu102-eval-bd" target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline flex items-center mt-2 md:mt-0">
                      <ExternalLink className="w-3 h-3 mr-1" /> UG1182 User Guide
                    </a>
                  </div>
                  <div className="p-4 bg-slate-900/50">
                    <p className="text-sm text-slate-400 mb-4">
                      A fully populated High Pin Count (400-pin) connector. Mapped to UltraScale+ High Performance (HP) banks capable of MIPI D-PHY, LVDS, and DCI (Digitally Controlled Impedance) up to 1.8V VADJ.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-300 border-collapse">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                          <tr>
                            <th className="px-4 py-3 border border-slate-700">FMC Signal Group</th>
                            <th className="px-4 py-3 border border-slate-700">Available Pins</th>
                            <th className="px-4 py-3 border border-slate-700">Physical / FPGA Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-700 bg-slate-900">
                            <td className="px-4 py-3 border border-slate-700 font-mono text-purple-300">LA[00:33], HA[00:23], HB[00:05]</td>
                            <td className="px-4 py-3 border border-slate-700">64 Diff Pairs</td>
                            <td className="px-4 py-3 border border-slate-700">Full standard complement. Mapped to 1.2V-1.8V HP Banks 65, 66, and 67.</td>
                          </tr>
                          <tr className="border-b border-slate-700 bg-slate-900">
                            <td className="px-4 py-3 border border-slate-700 font-mono text-purple-300">CLK[0:1]_M2C_P/N</td>
                            <td className="px-4 py-3 border border-slate-700">2 Diff Clock Pairs</td>
                            <td className="px-4 py-3 border border-slate-700">Global Clock (GC) pins. Feed these directly into MMCMs or PLLs for precision phase shifting.</td>
                          </tr>
                          <tr className="bg-slate-900">
                            <td className="px-4 py-3 border border-slate-700 font-mono text-purple-300">DP[00:07]_M2C/C2M</td>
                            <td className="px-4 py-3 border border-slate-700">8 GTH Quads</td>
                            <td className="px-4 py-3 border border-slate-700">Up to 16.3 Gbps per lane. Routed to dedicated GTH Quads 228 and 229.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* ZCU102 HPC1 Section */}
                <div className="border border-slate-700 rounded-lg overflow-hidden shadow-md">
                  <div className="bg-slate-800 p-4 border-b border-slate-700 flex flex-col md:flex-row justify-between md:items-center">
                    <h3 className="text-lg font-bold text-slate-200 flex items-center">
                      <Database className="w-5 h-5 mr-2 text-emerald-500" /> ZCU102 J4 Connector (HPC1)
                    </h3>
                    <a href="https://docs.xilinx.com/v/u/en-US/ug1182-zcu102-eval-bd" target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline flex items-center mt-2 md:mt-0">
                      <ExternalLink className="w-3 h-3 mr-1" /> UG1182 User Guide
                    </a>
                  </div>
                  <div className="p-4 bg-slate-900/50">
                    <p className="text-sm text-slate-400 mb-4">
                      A <strong>partially populated</strong> HPC connector. Due to physical die routing constraints on the ZU9EG package, several high-speed pairs are mechanically present on the physical connector but unconnected to the FPGA.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-300 border-collapse">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                          <tr>
                            <th className="px-4 py-3 border border-slate-700">FMC Signal Group</th>
                            <th className="px-4 py-3 border border-slate-700">Available Pins</th>
                            <th className="px-4 py-3 border border-slate-700">Physical / FPGA Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-700 bg-slate-900">
                            <td className="px-4 py-3 border border-slate-700 font-mono text-emerald-300">LA[00:29]_P/N</td>
                            <td className="px-4 py-3 border border-slate-700">30 Diff Pairs</td>
                            <td className="px-4 py-3 border border-slate-700">
                              Mapped to Bank 68. 
                              <span className="block mt-1 text-red-400 font-semibold text-xs">TRAP: LA30, LA31, LA32, and LA33 are explicitly No Connect (NC).</span>
                            </td>
                          </tr>
                          <tr className="border-b border-slate-700 bg-slate-900">
                            <td className="px-4 py-3 border border-slate-700 font-mono text-slate-500">HA, HB</td>
                            <td className="px-4 py-3 border border-slate-700 text-slate-500">0</td>
                            <td className="px-4 py-3 border border-slate-700 text-slate-500">No High-bank (HA/HB) signals are routed from the FPGA to HPC1.</td>
                          </tr>
                          <tr className="bg-slate-900">
                            <td className="px-4 py-3 border border-slate-700 font-mono text-emerald-300">DP[00:03]_M2C/C2M</td>
                            <td className="px-4 py-3 border border-slate-700">4 GTH Quads</td>
                            <td className="px-4 py-3 border border-slate-700">1 Quad routed to GTH Quad 230.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ----------------- 1V LOGIC & SIGNAL INTEGRITY TAB ----------------- */}
          {activeTab === 'signal' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">1.0V Logic & High-Speed Integrity</h2>
                
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Interfacing a 1.0V custom IC operating at 100MHz to a generic FPGA development board presents severe electrical challenges. Level shifting is not merely a "best practice"—it is a strict physical necessity dictated by CMOS threshold physics and transmission line theory. Since you have the capability to design the IC itself, placing the level shifters <strong>on-die</strong> is the mathematically optimal choice.
                </p>

                {/* The 1.0V Constraint */}
                <div className="bg-slate-800 p-5 rounded-lg border border-slate-700 mb-6">
                  <h3 className="text-lg font-bold text-red-400 flex items-center mb-3">
                    <ShieldAlert className="w-5 h-5 mr-2" /> The 1.0V Threshold Problem (CMOS Physics)
                  </h3>
                  <p className="text-sm text-slate-300 mb-3">
                    You cannot reliably feed a single-ended 1.0V signal directly into either the ZedBoard or the ZCU102 due to Input High Voltage (V<sub>IH</sub>) constraints.
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-400 space-y-2 ml-2">
                    <li>
                      <strong>ZedBoard (HR Banks):</strong> The lowest supported V<sub>CCO</sub> is 1.2V (LVCMOS12). For LVCMOS12, Xilinx guarantees a high read only if the input exceeds V<sub>IH</sub> = 0.65 &times; V<sub>CCO</sub>. <br/>
                      <span className="block mt-1 ml-6 text-slate-500">Math: 0.65 &times; 1.2V = <strong>0.78V</strong>. A 1.0V logic high only provides a 220mV noise margin. Any ringing or ground bounce will cause bit flips.</span>
                    </li>
                    <li>
                      <strong>ZCU102 (HP Banks):</strong> While UltraScale+ HP banks theoretically support 1.0V DCI standards, the ZCU102’s V<sub>ADJ</sub> PMBUS regulator defaults to 1.2V. You would have to reprogram the onboard MSP430 to output 1.0V, strictly limiting the entire FMC connector to a very weak drive strength.
                    </li>
                  </ul>
                </div>

                {/* NEW: On-Die 1.8V Bias Option */}
                <div className="bg-slate-800 p-5 rounded-lg border border-blue-500/50 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">Optimal Architecture</div>
                  <h3 className="text-lg font-bold text-blue-400 flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 mr-2" /> The Silicon Solution: On-Die 1.8V CMOS Biasing
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Since you are designing the IC, placing the 1.8V CMOS level shifters directly inside your IC's I/O pad ring is the absolute best approach. By utilizing a dual-supply architecture (e.g., VDD<sub>core</sub> = 1.0V, VDD<sub>IO</sub> = 1.8V), your IC natively drives the 1.8V LVCMOS standard out of its pins.
                  </p>
                  <div className="bg-slate-900 p-4 rounded border border-slate-700">
                    <h4 className="text-slate-200 font-semibold mb-2 text-sm">Why On-Die Shifting Wins:</h4>
                    <ul className="list-disc list-inside text-sm text-slate-400 space-y-2">
                      <li><strong>Zero External t<sub>pd</sub> Skew:</strong> PCB-mounted level shifters (like a TXB0104) introduce 1-2ns of channel-to-channel skew, eating 20-40% of your 5ns timing budget. On-die shifters are tightly matched across the silicon layout.</li>
                      <li><strong>Instant Fabric Compatibility:</strong> 1.8V precisely matches the native V<sub>ADJ</sub> of the ZCU102's HP banks, and easily satisfies the ZedBoard's HR banks (if J18 is set to 1.8V).</li>
                      <li><strong>Transmission Line Caveats:</strong> If routing 1.8V single-ended at 100MHz (BW &approx; 350MHz), you must still strictly adhere to characteristic impedance (Z<sub>0</sub> = 50&Omega;). Ensure the FMC carrier PCB routes these 3 data lines and the clock directly over an uninterrupted, continuous ground plane to control the return current path and minimize common-mode inductive looping.</li>
                    </ul>
                  </div>
                </div>

                {/* Legacy Level Shifting & Phase Skew */}
                <div className="bg-slate-800 p-5 rounded-lg border border-slate-700 mb-6">
                  <h3 className="text-lg font-bold text-purple-400 flex items-center mb-3">
                    <Zap className="w-5 h-5 mr-2" /> Fallback 1: External Level Shifting & The Skew Penalty
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    If you are forced to output 1.0V from the IC and shift it externally on the carrier board, you face a severe timing penalty. Standard CMOS level shifters introduce massive propagation delay (t<sub>pd</sub>) variances.
                  </p>
                  <div className="bg-slate-900 p-4 rounded border border-red-900/50">
                    <h4 className="text-red-400 font-semibold mb-2">The Standard Logic Trap</h4>
                    <p className="text-xs text-slate-400">
                      At 100MHz (DDR), the Unit Interval (UI) is <strong>5ns</strong>. If you use a cheap external level shifter across 3 data lines, the channel-to-channel skew (t<sub>skew</sub>) can easily vary due to temperature and trace capacitance. If Data 0 arrives 1.5ns later than Data 1, you will lose a massive portion of your valid data "eye", making the FPGA's <code>IDELAY</code> calibration incredibly difficult to tune.
                    </p>
                  </div>
                </div>

                {/* Single-Ended vs Differential */}
                <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-bold text-emerald-400 flex items-center mb-3">
                    <Activity className="w-5 h-5 mr-2" /> Fallback 2: Maximum Integrity via Differential Conversion
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    If EMI, Crosstalk (NEXT/FEXT), or FMC connector ground bounce becomes an issue with the single-ended 1.8V traces, the ultimate electromagnetic solution is converting to a differential standard (like LVDS) right at the IC output or via an external high-bandwidth comparator.
                  </p>
                  <div className="bg-slate-900 p-4 rounded border border-slate-700 text-sm text-slate-400">
                    <strong>The Math of Differential Signaling:</strong> V<sub>diff</sub> = (V<sub>+</sub> + V<sub>noise</sub>) - (V<sub>-</sub> + V<sub>noise</sub>) = V<sub>+</sub> - V<sub>-</sub>. Because the VITA 57.1 FMC connector is physically designed as an array of 100&Omega; differential pairs, any ground bounce across the connector is perfectly canceled out as common-mode noise. Furthermore, the return current of the positive trace is exactly mirrored in the tight negative trace right next to it, shrinking the parasitic inductance loop to near-zero.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ----------------- EEPROM & VADJ TAB ----------------- */}
          {activeTab === 'eeprom' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4">IPMI FRU EEPROM & VADJ Negotiation</h2>
                
                <p className="text-slate-300 mb-6 leading-relaxed">
                  The ZCU102 restricts V<sub>ADJ</sub> at boot because applying 3.3V to the UltraScale+ 16nm FinFET HP banks will cause immediate, catastrophic dielectric breakdown of the gate oxides. To verify it is safe to turn on the 1.8V buck regulators, the ZCU102's onboard TI MSP430 acts as an I2C master, querying your FMC carrier board for an IPMI FRU (Field Replaceable Unit) binary blob.
                </p>

                {/* The Chicken and Egg Trap */}
                <div className="bg-slate-800 p-5 rounded-lg border border-red-500/50 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">PCB Design Trap</div>
                  <h3 className="text-lg font-bold text-red-400 flex items-center mb-3">
                    <Zap className="w-5 h-5 mr-2" /> The "Chicken & Egg" Power Plane Trap
                  </h3>
                  <p className="text-sm text-slate-300">
                    If you tie the EEPROM's VCC pin to your carrier board's V<sub>ADJ</sub> plane, your board will <strong>never boot</strong>. The MSP430 needs to read the EEPROM to turn on V<sub>ADJ</sub>, but the EEPROM cannot reply because V<sub>ADJ</sub> is off. <br /><br />
                    <strong>The Physical Fix:</strong> The EEPROM must be powered strictly by the <strong>3P3VAUX</strong> rail (FMC Pin <code>D32</code>). This rail is active the moment the ZCU102 is plugged into the wall, entirely bypassing the V<sub>ADJ</sub> interlock sequence.
                  </p>
                </div>

                {/* Bill of Materials */}
                <h3 className="text-xl font-bold text-slate-200 mt-8 mb-4 border-b border-slate-700 pb-2 flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-blue-400" /> Carrier Board EEPROM BOM
                </h3>
                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-sm text-left text-slate-300 border-collapse">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                      <tr>
                        <th className="px-4 py-3 border border-slate-700">Component</th>
                        <th className="px-4 py-3 border border-slate-700">Specific Part / Value</th>
                        <th className="px-4 py-3 border border-slate-700">FMC Mapping / Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700 bg-slate-900">
                        <td className="px-4 py-3 border border-slate-700 font-semibold text-slate-200">I2C EEPROM</td>
                        <td className="px-4 py-3 border border-slate-700 font-mono text-blue-300">ST M24C02-RMC6TG</td>
                        <td className="px-4 py-3 border border-slate-700">2-Kbit size. Connect I2C lines to FMC pins <code>C30</code> (SCL) and <code>C31</code> (SDA). Address must be <code>0x50</code> (Tie A0, A1, A2 to GND).</td>
                      </tr>
                      <tr className="border-b border-slate-700 bg-slate-900">
                        <td className="px-4 py-3 border border-slate-700 font-semibold text-slate-200">Power Source</td>
                        <td className="px-4 py-3 border border-slate-700 font-mono text-emerald-300">3P3VAUX (3.3V)</td>
                        <td className="px-4 py-3 border border-slate-700">FMC Pin <code>D32</code>. Decouple with a 0.1μF 0402 X7R ceramic capacitor directly at the IC pin.</td>
                      </tr>
                      <tr className="bg-slate-900">
                        <td className="px-4 py-3 border border-slate-700 font-semibold text-slate-200">I2C Pull-ups</td>
                        <td className="px-4 py-3 border border-slate-700 font-mono text-slate-400">4.7kΩ Resistors</td>
                        <td className="px-4 py-3 border border-slate-700">Pull SCL and SDA up to 3P3VAUX. (The ZCU102 provides host-side pull-ups, but having carrier-side pads unpopulated/populated allows flexibility for standalone testing).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* NEW: CH341A WORKFLOW */}
                <h3 className="text-xl font-bold text-slate-200 mt-8 mb-4 border-b border-slate-700 pb-2 flex items-center">
                  <PenTool className="w-5 h-5 mr-2 text-purple-400" /> CH341A Windows Workflow & Off-Chip Programming
                </h3>

                <div className="space-y-6">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    You do <strong>not</strong> need to run Linux. The CH341A USB programmer is fully supported on Windows. Furthermore, programming the EEPROM <strong>off-chip</strong> (before soldering it to the carrier board) is the safest and most reliable method for hardware prototyping.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Software */}
                    <div className="bg-slate-800 p-5 rounded-md border border-slate-700">
                      <h4 className="text-blue-400 font-bold mb-3 flex items-center"><Server className="w-4 h-4 mr-2"/> Windows GUI Software</h4>
                      <p className="text-sm text-slate-300 mb-3">
                        Do not bother with command-line tools if you are on Windows. Download either <strong>NeoProgrammer</strong> or <strong>AsProgrammer</strong>. 
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                        <li>Install the CH341A Windows Driver.</li>
                        <li>Open NeoProgrammer.</li>
                        <li>Click <code>Detect</code> or manually select <code>I2C EEPROM -&gt; 24C02</code>.</li>
                        <li>Load your generated <code>.bin</code> FRU file.</li>
                        <li>Click <code>Write IC</code>.</li>
                      </ul>
                    </div>

                    {/* Hardware Modes */}
                    <div className="bg-slate-800 p-5 rounded-md border border-slate-700">
                      <h4 className="text-emerald-400 font-bold mb-3 flex items-center"><MicrochipIcon className="w-4 h-4 mr-2"/> CH341A Jumper Setup</h4>
                      <p className="text-sm text-slate-300 mb-2">
                        The CH341A has a physical jumper block that switches it between UART/TTL mode and I2C/SPI Programming mode.
                      </p>
                      <div className="bg-slate-900 p-2 rounded text-xs text-slate-400 border border-slate-600 mb-2">
                        <strong>Crucial:</strong> Ensure the jumper is bridging pins <strong>1 and 2</strong> (labeled I2C/SPI). If left on 2 and 3, it acts as a COM port.
                      </div>
                      <p className="text-xs text-slate-400">
                        The M24C02 is an I2C device, so it uses the "24xx" half of the CH341A's ZIF socket. Look at the silkscreen on the programmer to see which 8 holes to insert the chip into.
                      </p>
                    </div>
                  </div>

                  {/* Off-Chip vs In-Circuit */}
                  <div className="bg-slate-800 p-5 rounded-md border border-slate-700 mt-4">
                    <h4 className="text-slate-200 font-bold mb-3">Off-Chip vs. In-Circuit Programming</h4>
                    <div className="space-y-4">
                      
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <strong className="text-emerald-400 text-sm">Method 1: Off-Chip via ZIF Socket (Highly Recommended)</strong>
                        <p className="text-sm text-slate-400 mt-1">
                          Buy an "SOIC8 to DIP8 Spring Adapter". You drop your bare M24C02 surface-mount chip into the spring adapter, plug the adapter into the CH341A's ZIF socket, program it on your PC, and <em>then</em> solder the pre-programmed chip onto your carrier board. This guarantees 100% success and zero power plane conflicts.
                        </p>
                      </div>

                      <div className="border-l-4 border-yellow-500 pl-4">
                        <strong className="text-yellow-400 text-sm">Method 2: In-Circuit via SOP8 Test Clip (Proceed with Caution)</strong>
                        <p className="text-sm text-slate-400 mt-1">
                          If you have already soldered the blank EEPROM to the carrier board, you can use the SOP8 "Pomona style" test clip that comes with most CH341A kits. You clip it directly over the soldered IC.
                        </p>
                        <p className="text-xs text-slate-500 mt-2 bg-slate-900 p-2 rounded">
                          <strong>The Physics Warning:</strong> The CH341A will inject 3.3V into the EEPROM's VCC pin. Because this pin is tied to your board's <code>3P3VAUX</code> net, the CH341A will end up trying to back-power that entire power plane. If you have large decoupling capacitors or other ICs on that rail, the CH341A's weak internal LDO will instantly sag, causing the I2C write to fail. Only use the test clip if the EEPROM is electrically isolated.
                        </p>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}