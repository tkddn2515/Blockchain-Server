import { CustomRepository } from "src/databases/typeorm-ex.decorator"
import { Repository } from "typeorm"
import { CreateWorldADto } from "./dto/create-worldA.dto"
import { WorldA } from "./world-a.entity"

@CustomRepository(WorldA)
export class WorldARepository extends Repository<WorldA> {
  async createWorldA(createWorldADto: CreateWorldADto): Promise<string> {
    try {
      const { a } = createWorldADto;
      const worldA: WorldA = await this.create({
        a 
      });
      await this.save(worldA);
      return 'true';
    } catch {
      return 'false';
    }
  }
}