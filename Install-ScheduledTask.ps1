#Requires -RunAsAdministrator
$action = New-ScheduledTaskAction -Execute "node" -Argument "index.js" -WorkingDirectory $pwd.path
$dailyTrigger = New-ScheduledTaskTrigger -Daily -At 4pm
$startupTrigger = New-ScheduledTaskTrigger -AtStartup
$taskName = $pwd.path.split('\')[-1]
$principal = New-ScheduledTaskPrincipal -UserID $env:UserName -LogonType S4U
$description = "Simple web scraping app with pupeteer to check if you won the checkpot on win2day.at "

$task = New-ScheduledTask -Action $action -Trigger $dailyTrigger, $startupTrigger -Principal $principal -Description $description
Register-ScheduledTask -TaskName $taskName -InputObject $task -TaskPath "nodejs"
