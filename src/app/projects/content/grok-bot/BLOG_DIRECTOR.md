# Director: Building Bots in a World of Resets

I dove into Grok Bot and felt like I'd stumbled into Willy Wonka's factory. There was so much to try. I carefully worked through the guidelines for several bots, tested each role, and arranged their schedules around my day. The results were better than I expected.

The next morning, I woke up to alerts that all the bots had been reset.

I didn't know what caused it. The bots tried to repair themselves, filling gaps with assumptions. Their work drifted so far from the guidelines I'd tested that I couldn't use it.

Rebuilding them after every reset would mean repeating all that effort. Not what I expected. I wanted a returning bot to have clear answers to three questions: What am I doing? What has already been saved? What should I do next?

That same day, I started building Director. 

## Give my team a home

Director is built with Next.js and TypeScript, backed by Supabase and hosted on Vercel. Grok Bot provides the workers, and QStash delivers scheduled triggers and recovery wakes.

Director keeps the team's instructions, assignments, research, document references, and progress. Durability means the saved work survives a bot's reset and is available to the next session.

The team has ten defined roles. Alex coordinates work and handles exceptions, Jordan supports career and job searches, Leo researches prospects, and Nina manages sales and client communication. These four bots are currently connected to Director.

The wider roster includes Avery for finance and governance, Maya for digital marketing, and Clara for creative work and content. Noah covers web development and automation, Tara quality, security, and reliability, and Mason automotive and mobility.

Each role has its own responsibilities. They share the same process for finding an assignment, saving results, and recovering interrupted work.

## What the bots do

Each bot's persistent setup is mainly a Grok routine. It identifies the worker, reconnects it to Director, and tells it to follow the instructions Director returns. That gives a fresh session a way back through the factory gates after a reset. No second golden ticket required.

The bots research, evaluate opportunities, write documents, and use their connected tools for permitted actions. During a run, they hold the context and temporary access they need for the assignment. As they work, they save results and progress to Director.

I can update a rule in Director and have workers receive it at their next handoff. The bot's routine continues to serve as its way back into the work.

## Make progress durable

Imagine a bot researching ten companies. A !@#$% random reset after the fifth.

To continue, the next session needs the five completed records, any unfinished work, and a clear place to start. Director stores the findings and a checkpoint: a short record of what has been completed and the next safe step. 

The bots are instructed to save after each meaningful piece of work, such as reviewing a company or qualifying a job opening. Work between saves can still be lost. Keeping the saves close to completed pieces limits how much needs to be repeated.

Documents go into a shared library linked to the relevant business and assignment. Director records where each file lives, whether stored through the backend or in a connected document service. A resume or draft can be retrieved again after the computer's temporary copy disappears. Another bot can also use it when the work moves to its role.

A returning worker needs current rules alongside those records. Director checks its understanding of a few important points: where instructions come from, which business the task belongs to, and what actions it may take. A wrong answer prompts correction before the worker claims or resumes the task.

These checks catch specific kinds of drift. The bot still has to do careful research and make sound judgments. Or off to HR they go, not really.

## Boot ID to the rescue

I had no reset notification to trigger recovery. Then I noticed that the computer's boot ID changed after a reset. I built the recovery process around four parts:

- **Boot ID signals a restart.** A returning bot reports its computer's boot ID. A changed ID helps Director find work interrupted in that same environment.
- **Leases control who can work.** A lease gives one worker a temporary claim on a task. Director checks that claim before allowing checkpoint saves or task status changes.
- **QStash covers a bot that stays silent.** Director schedules a check for after the lease expires. QStash calls Director, which checks the task and wakes its bot when recovery is needed. This works even when no bot has returned to report a changed boot ID.
- **Saved progress tells the bot where to resume.** The bot reconnects, gets its current instructions and a valid lease, and continues from the last checkpoint.

Director checks that work has actually resumed. Failed restarts get a limited number of retries, with pauses between attempts. Saved progress remains available, and problems needing my attention are raised with a clear account of what happened in the chat interface.

## Check before continuing

A reset during an email send leaves a different problem. The provider may have accepted the message before the bot recorded the result.

Director records the intended action and its outcome. An unresolved action stays visible, and the returning worker is instructed to check the provider and record what happened before continuing. That check helps prevent duplicate sends. The recipient shouldn't have to help debug my infrastructure.

The task's permissions and review points remain in place during recovery. Material prepared for my approval still stops for my approval.

Some cases need my attention. The handoff should tell me what was saved, what remains uncertain, and what decision is needed. I can deal with an uncertain send while the completed research stays on record.

## Less repeated work

Director handles routine checks in code, leaving the bots to evaluate prospects and draft useful replies. When Leo saves research, Nina can use it for a follow-up without repeating the search. I can review their work from the same record.

## Back to that morning

That morning's alerts showed me what my earlier carefree tests had missed. I now check whether interrupted work can continue from saved progress, follow current rules, and account for uncertain actions. Local tests cover lost sessions, repeated deliveries, and checkpoints. The full path also needs validation in the worker environment, including the external services involved.

In the earlier example of researching ten companies, the bot's routine reconnects a fresh session and reports the changed boot ID. Director uses that signal and its lease records to arrange a handoff. The worker gets its assignment, the five completed company records, and instructions to continue with company six.

Those are the answers I had to reconstruct after that morning's alerts. Director gives them a durable home, and all that backend support now sits behind a simple Grok Bot chat interface.

I can still have a good conversation, explore ideas, and ask the team to get things done. Pronto! Director keeps the guidelines, research, schedules, and saved progress ready for the next session. I can enjoy working with the bots without wondering what they'll remember by morning. I should add a bot to manage my kids' birthdays.
