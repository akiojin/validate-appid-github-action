import * as core from '@actions/core'

function RemoveInvalidCharsForAppID(input: string): string
{
  return input
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '') // 英小文字と数字とピリオド以外を削除
    .replace(/^[0-9]+/, '')     // 先頭の数字を削除
    .replace(/\.{2,}/g, '.')    // 連続するピリオドを一つに置換
}

try {
  const replaced = RemoveInvalidCharsForAppID(`${core.getInput('domain')}.${core.getInput('app-name')}`)

  core.setOutput('app-id', replaced)
  core.exportVariable('APP_ID', replaced)  
} catch (ex: any) {
  core.setFailed(ex.message);
}
