import { z } from 'zod'
import { defineMcpTool } from '@nuxtjs/mcp-toolkit/server'

export default defineMcpTool({
  name: 'hello',
  description: '向 IPlay-Compression 应用问好，用于验证 MCP Server 是否连通',
  inputSchema: { message: z.string() },
  handler: async ({ message }) => `Hello from IPlay-Compression: ${message}`,
})
