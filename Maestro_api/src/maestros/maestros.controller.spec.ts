import { Test, TestingModule } from '@nestjs/testing';
import { MaestrosController } from './maestros.controller';
import { MaestrosService } from './maestros.service';

describe('MaestrosController', () => {
  let controller: MaestrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaestrosController],
      providers: [MaestrosService],
    }).compile();

    controller = module.get<MaestrosController>(MaestrosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
