import * as TE from 'fp-ts/TaskEither';

type Steps = () => TE.TaskEither<void, void>

const runTestSteps = async (steps: Steps[]): Promise<void> => {
    if (steps.length > 0) {
        for (const step of steps) {
            await step()();
        }
    } else {
        throw new Error(`There are no any step to execute!`);
    }
}

export default runTestSteps;