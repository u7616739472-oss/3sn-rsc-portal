// Simulador Blockchain 3SN
// Usa ethers.js para generar hashes reales de transacciones simuladas
// Compatible con Ethereum testnet (Sepolia) o modo simulado local

import { ethers } from 'ethers'

export interface BlockchainRecord {
  hash: string
  txHash: string
  blockNumber: number
  timestamp: number
  data: string
  verified: boolean
  network: '3SN-Simnet' | 'sepolia' | 'mainnet'
}

export interface EvidencePayload {
  proyectoId: string
  lineaId: string
  tipo: string
  titulo: string
  contenidoHash: string
  timestamp: number
  ongdId: string
}

// Genera un hash SHA-256 del contenido (comportamiento real de blockchain)
export function hashContent(data: object): string {
  const json = JSON.stringify(data, Object.keys(data).sort())
  // Usamos ethers para generar hash compatible con Ethereum
  return ethers.id(json)
}

// Simula una transaccion blockchain con datos reales de hash
export async function registrarEnBlockchain(
  payload: EvidencePayload
): Promise<BlockchainRecord> {
  // Hash del contenido usando keccak256 (mismo que Ethereum)
  const dataHash = hashContent(payload)
  
  // Simular TX hash (en produccion seria la TX real de Ethereum/Polygon)
  const txData = {
    from: '0x3SN-Platform',
    to: '0x3SN-EvidenceRegistry',
    data: dataHash,
    nonce: Date.now(),
    timestamp: payload.timestamp
  }
  const txHash = ethers.id(JSON.stringify(txData))
  
  // Simular numero de bloque
  const blockNumber = Math.floor(Date.now() / 1000) - 1700000000 + 19000000
  
  const record: BlockchainRecord = {
    hash: dataHash,
    txHash: txHash,
    blockNumber: blockNumber,
    timestamp: payload.timestamp,
    data: JSON.stringify(payload),
    verified: true,
    network: '3SN-Simnet'
  }
  
  // Simular latencia de red blockchain
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  return record
}

// Verifica que un hash registrado corresponde al contenido
export function verificarEvidencia(
  payload: EvidencePayload,
  registeredHash: string
): boolean {
  const currentHash = hashContent(payload)
  return currentHash === registeredHash
}

// Formatea un hash para mostrar (0x1234...abcd)
export function formatHash(hash: string, chars = 8): string {
  if (!hash) return ''
  if (hash.length <= chars * 2 + 2) return hash
  return `${hash.substring(0, chars + 2)}...${hash.substring(hash.length - chars)}`
}

// Genera URL del explorador blockchain simulado
export function getExplorerUrl(txHash: string): string {
  return `https://3sn-explorer.vercel.app/tx/${txHash}`
}

// Obtiene el estado de la red blockchain simulada
export function getNetworkStatus(): {
  connected: boolean
  network: string
  blockNumber: number
  gasPrice: string
} {
  return {
    connected: true,
    network: '3SN-Simnet v1.0',
    blockNumber: Math.floor(Date.now() / 1000) - 1700000000 + 19000000,
    gasPrice: '0 (Gratuito - Red Social 3SN)'
  }
}
