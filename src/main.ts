import * as core from '@actions/core'

function RemoveInvalidCharsForAndroid(input: string): string
{
  return input
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '') // 英小文字と数字とピリオド以外を削除
    .replace(/^[0-9]+/, '')     // 先頭の数字を削除
    .replace(/\.{2,}/g, '.')    // 連続するピリオドを一つに置換
}

function RemoveInvalidCharsForiOS(input: string): string
{
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // 英小文字と数字以外を削除
    .replace(/^[0-9]+/, '')    // 先頭の数字を削除
}

function RemoveInvalidChars(): string
{
  const buildTarget = core.getInput('build-target').toLowerCase()
  const domain = core.getInput('domain')
  const appName = core.getInput('app-name')

  if (buildTarget === 'ios') {
    return RemoveInvalidCharsForiOS(`${domain}.${appName}`)
  } else if (buildTarget === 'android') {
    return RemoveInvalidCharsForAndroid(`${domain}.${appName}`)
  } else {
    throw new Error('Not supported build target. Please set ios or android.')
  }
}

try {
  const replaced = RemoveInvalidChars()

  core.setOutput('app-id', replaced)
  core.exportVariable('APP_ID', replaced)  
} catch (ex: any) {
  core.setFailed(ex.message);
}
