import React from 'react';
import { HardDrive, ExternalLink, CheckCircle, XCircle, Zap, Server, Network, Terminal, Database, Activity, ShieldAlert } from 'lucide-react';

export default function NvmeStorageTab() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 shadow-xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-white flex items-center mb-2 md:mb-0">
            <HardDrive className="w-6 h-6 mr-3 text-blue-500" /> NVMe Burst-Capture Storage Architecture
          </h2>
          <a
            href="https://github.com/wonderfulnx/Xilinx-MPSoC-NVMeSSD-Config"
            target="_blank" rel="noreferrer"
            className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium bg-slate-800 px-3 py-1.5 rounded border border-slate-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-2" /> wonderfulnx/Xilinx-MPSoC-NVMeSSD-Config
          </a>
        </div>

        <p className="text-slate-300 mb-8 leading-relaxed">
          Instead of streaming all captured data over Ethernet in real-time, this architecture writes capture sessions directly to a local NVMe SSD attached to the ZCU102. Sessions are stored as timestamped binary files and selectively downloaded over GbE from a laptop after the fact. The ZCU102 becomes a fully self-contained DAQ unit.
        </p>

        {/* Architecture Flow */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-400 mb-6">Capture & Retrieval Flow</h3>

          <p className="text-xs text-slate-500 uppercase font-bold mb-2 tracking-wider">Capture Phase</p>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {[
              { label: 'Custom IC', desc: '100MHz + 3-bit data' },
              { label: 'ISERDESE3', desc: 'IDELAYE3 calibrated' },
              { label: 'Capture FSM', desc: 'AXI4-Stream' },
              { label: 'AXI SG-DMA', desc: 'DDR4 ping-pong' },
              { label: 'NVMe Driver', desc: 'PS Linux kernel' },
              { label: 'M.2 NVMe', desc: 'session_001.bin' },
            ].map((node, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="bg-slate-900 border border-slate-600 rounded p-3 text-center min-w-[110px]">
                  <div className="text-sm font-bold text-slate-200">{node.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{node.desc}</div>
                </div>
                {idx < arr.length - 1 && <span className="text-slate-500 text-lg">→</span>}
              </React.Fragment>
            ))}
          </div>

          <p className="text-xs text-slate-500 uppercase font-bold mb-2 tracking-wider">Retrieval Phase (later, on demand)</p>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Laptop', desc: 'SSH / sftp client' },
              { label: 'GbE Link', desc: '~100 MB/s sustained' },
              { label: 'ZCU102', desc: 'sshd file server' },
              { label: 'M.2 NVMe', desc: 'reads session file' },
            ].map((node, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="bg-slate-900 border border-slate-600 rounded p-3 text-center min-w-[110px]">
                  <div className="text-sm font-bold text-slate-200">{node.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{node.desc}</div>
                </div>
                {idx < arr.length - 1 && <span className="text-slate-500 text-lg">←</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Hardware BOM */}
        <h3 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2 flex items-center">
          <Terminal className="w-5 h-5 mr-2 text-blue-400" /> Hardware Required
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-slate-300 border-collapse">
            <thead className="text-xs text-slate-400 uppercase bg-slate-800">
              <tr>
                <th className="px-4 py-3 border border-slate-700">Component</th>
                <th className="px-4 py-3 border border-slate-700">Example / Cost</th>
                <th className="px-4 py-3 border border-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700 bg-slate-900">
                <td className="px-4 py-3 border border-slate-700 font-semibold text-slate-200">M.2 NVMe SSD</td>
                <td className="px-4 py-3 border border-slate-700 font-mono text-blue-300">Samsung 980 / WD SN770 1TB (~$40–50)</td>
                <td className="px-4 py-3 border border-slate-700">Consumer M.2 2280. Draws 3–5W — supplied by ZCU102 PCIe slot natively. No external power needed.</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-900">
                <td className="px-4 py-3 border border-slate-700 font-semibold text-slate-200">PCIe-to-M.2 Adapter</td>
                <td className="px-4 py-3 border border-slate-700 font-mono text-blue-300">Generic PCIe x4 → M.2 riser (~$7–15)</td>
                <td className="px-4 py-3 border border-slate-700">Plugs into ZCU102 PCIe edge connector. The ZCU102 acts as root complex; the adapter presents the M.2 slot.</td>
              </tr>
              <tr className="bg-slate-900">
                <td className="px-4 py-3 border border-slate-700 font-semibold text-slate-200">USB-to-GbE Adapter</td>
                <td className="px-4 py-3 border border-slate-700 font-mono text-blue-300">Any USB 3.0 GbE adapter (~$15–20)</td>
                <td className="px-4 py-3 border border-slate-700">For laptop with no physical Ethernet port. Direct cable to ZCU102 GEM3.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PM1735 callout */}
        <div className="bg-slate-800 p-5 rounded-lg border border-red-500/40 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">Not Compatible</div>
          <h4 className="text-red-400 font-bold flex items-center mb-2">
            <XCircle className="w-4 h-4 mr-2" /> Why the Samsung PM1735 HHHL Won't Work Here
          </h4>
          <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
            <li>HHHL AIC form factor — physically cannot seat in a PCIe-to-M.2 adapter.</li>
            <li>Draws 25W+ under load — exceeds what the ZCU102 PCIe slot can supply without external 12V auxiliary power.</li>
            <li>Uses PCIe x8; ZCU102 PS-side PCIe is x4 Gen2. Would negotiate down but power issue remains.</li>
            <li><strong>Better use:</strong> Install it in a desktop PC as a high-endurance capture destination if one is ever available.</li>
          </ul>
        </div>

        {/* GTR Trade-off */}
        <h3 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" /> The GTR Lane Trade-off
        </h3>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          The ZU9EG has <strong>6 PS-side GTR (gigabit transceiver) lanes</strong> shared between USB3, DisplayPort, SATA, and PCIe. To allocate all 4 lanes to PCIe for full Gen2 x4 bandwidth, the other interfaces must be disabled in the device tree. This is exactly what the reference implementation does.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-800 p-4 rounded border border-red-500/30">
            <h4 className="text-red-400 font-semibold text-sm mb-2 flex items-center"><XCircle className="w-4 h-4 mr-1"/> Disabled to free GTR lanes</h4>
            <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
              <li>USB 3.0 SuperSpeed (falls back to USB 2.0)</li>
              <li>DisplayPort output</li>
              <li>SATA interface</li>
            </ul>
          </div>
          <div className="bg-slate-800 p-4 rounded border border-emerald-500/30">
            <h4 className="text-emerald-400 font-semibold text-sm mb-2 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> What you keep</h4>
            <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
              <li>PCIe Gen2 x4 (~1500 MB/s theoretical)</li>
              <li>GbE (GEM3) — unaffected, used for retrieval</li>
              <li>USB 2.0 — still functional for debug</li>
              <li>SD card — still functional for boot</li>
            </ul>
          </div>
        </div>

        {/* Performance */}
        <h3 className="text-xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-purple-400" /> Measured Performance (Reference Implementation)
        </h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left text-slate-300 border-collapse">
            <thead className="text-xs text-slate-400 uppercase bg-slate-800">
              <tr>
                <th className="px-4 py-3 border border-slate-700">Test Method</th>
                <th className="px-4 py-3 border border-slate-700">Speed</th>
                <th className="px-4 py-3 border border-slate-700">Relevance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700 bg-slate-900">
                <td className="px-4 py-3 border border-slate-700 font-mono text-slate-300">dd (raw block write)</td>
                <td className="px-4 py-3 border border-slate-700 text-emerald-400 font-bold">~1000 MB/s</td>
                <td className="px-4 py-3 border border-slate-700">Hardware headroom — the NVMe path itself is not the bottleneck.</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-900">
                <td className="px-4 py-3 border border-slate-700 font-mono text-slate-300">fio (libaio async)</td>
                <td className="px-4 py-3 border border-slate-700 text-emerald-400 font-bold">~1400 MB/s</td>
                <td className="px-4 py-3 border border-slate-700">Near theoretical PCIe Gen2 x4 ceiling (~1500 MB/s).</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-900">
                <td className="px-4 py-3 border border-slate-700 font-mono text-slate-300">libiio buffer capture + write</td>
                <td className="px-4 py-3 border border-slate-700 text-yellow-400 font-bold">~52 MB/s</td>
                <td className="px-4 py-3 border border-slate-700">Real ADC capture rate — bottlenecked by libiio layer, not NVMe.</td>
              </tr>
              <tr className="border-b border-slate-700 bg-slate-900">
                <td className="px-4 py-3 border border-slate-700 font-mono text-slate-300">Your DAQ @ 100MHz × 3-bit</td>
                <td className="px-4 py-3 border border-slate-700 text-blue-400 font-bold">~37 MB/s needed</td>
                <td className="px-4 py-3 border border-slate-700">Covered by even the libiio path. Direct DMA write path gives significant headroom.</td>
              </tr>
              <tr className="bg-slate-900">
                <td className="px-4 py-3 border border-slate-700 font-mono text-slate-300">Your DAQ @ 300MHz × 3-bit</td>
                <td className="px-4 py-3 border border-slate-700 text-yellow-400 font-bold">~112 MB/s needed</td>
                <td className="px-4 py-3 border border-slate-700">Requires bypassing libiio — direct DMA-to-NVMe write path. Hardware headroom exists.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Software Stack */}
        <h3 className="text-xl font-bold text-slate-200 mt-8 mb-4 border-b border-slate-700 pb-2 flex items-center">
          <Server className="w-5 h-5 mr-2 text-blue-400" /> PetaLinux Software Stack
        </h3>
        <div className="space-y-4 mb-8">
          <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <h4 className="text-slate-200 font-semibold mb-2 text-sm">1. FPGA / Vivado</h4>
            <p className="text-sm text-slate-400">Apply <code className="text-blue-300">nvme_ssd_hdl_change.patch</code> — configures all 4 PS GTR lanes for PCIe, sets PS clock to 1333 MHz max.</p>
          </div>
          <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <h4 className="text-slate-200 font-semibold mb-2 text-sm">2. Linux Kernel (menuconfig)</h4>
            <p className="text-sm text-slate-400">Enable <code className="text-blue-300">CONFIG_PCI</code>, <code className="text-blue-300">CONFIG_BLK_DEV_NVME</code>. Disable NVMe multipath. Apply <code className="text-blue-300">nvme_ssd_linux_change.patch</code> for device tree.</p>
          </div>
          <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <h4 className="text-slate-200 font-semibold mb-2 text-sm">3. Kernel Command Line</h4>
            <code className="text-xs text-emerald-300 bg-slate-900 p-2 rounded block">cma=1788M industrialio_buffer_dma.max_block_size=67108864</code>
            <p className="text-sm text-slate-400 mt-2">Reserves contiguous memory for DMA buffers to prevent fragmentation during sustained capture.</p>
          </div>
          <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <h4 className="text-slate-200 font-semibold mb-2 text-sm">4. SD Card Boot Files</h4>
            <p className="text-sm text-slate-400">Deploy <code className="text-blue-300">BOOT.BIN</code> (FPGA bitstream + FSBL), <code className="text-blue-300">Image</code> (kernel), <code className="text-blue-300">system.dtb</code> (modified device tree) to SD card root.</p>
          </div>
          <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <h4 className="text-slate-200 font-semibold mb-2 text-sm">5. NVMe Mount & Session Management</h4>
            <code className="text-xs text-emerald-300 bg-slate-900 p-2 rounded block whitespace-pre">{`mkfs.ext4 /dev/nvme0n1
mount /dev/nvme0n1 /mnt/nvme
# Capture writes to:
/mnt/nvme/session_$(date +%Y%m%d_%H%M%S).bin`}</code>
          </div>
          <div className="bg-slate-800 p-4 rounded border border-slate-700">
            <h4 className="text-slate-200 font-semibold mb-2 text-sm">6. Retrieval from Laptop</h4>
            <code className="text-xs text-emerald-300 bg-slate-900 p-2 rounded block whitespace-pre">{`# List available sessions
ssh root@192.168.1.x ls /mnt/nvme/

# Pull a specific session (~100 MB/s over GbE)
sftp root@192.168.1.x:/mnt/nvme/session_20260512_143022.bin .`}</code>
          </div>
        </div>

        {/* Warning */}
        <div className="bg-slate-800 p-5 rounded-lg border border-yellow-500/40">
          <h4 className="text-yellow-400 font-bold flex items-center mb-2">
            <ShieldAlert className="w-4 h-4 mr-2" /> ADI Kuiper Linux vs Stock PetaLinux
          </h4>
          <p className="text-sm text-slate-400">
            The reference implementation runs on <strong>ADI Kuiper Linux 2023_r2</strong> (Analog Devices' pre-built PetaLinux image), not stock PetaLinux. Kuiper Linux includes the <code>libiio</code> framework and pre-enabled industrial I/O kernel drivers. If building from scratch with stock PetaLinux, you will need to manually enable the same kernel modules. Using Kuiper Linux as your base is strongly recommended to reduce bring-up time.
          </p>
        </div>

      </div>
    </div>
  );
}
