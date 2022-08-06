import { archiveBundle } from "./archiveBundle";
import { archiveSource } from "./archiveSource";

async function archiveAll() {
  await archiveSource();
  await archiveBundle();
}

archiveAll();