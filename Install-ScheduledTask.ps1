$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c win2dayWinnerOfTheDay.exe" -WorkingDirectory $pwd.path
$dailyTrigger = New-ScheduledTaskTrigger -Daily -At 4pm
$startupTrigger = New-ScheduledTaskTrigger -AtLogOn -User $env:UserName
$taskName = $pwd.path.split('\')[-1]
$description = "Simple web scraping app with pupeteer to check if you won the checkpot on win2day.at "

$task = New-ScheduledTask -Action $action -Trigger $dailyTrigger, $startupTrigger -Description $description
Register-ScheduledTask -TaskName $taskName -InputObject $task -TaskPath "nodejs"
