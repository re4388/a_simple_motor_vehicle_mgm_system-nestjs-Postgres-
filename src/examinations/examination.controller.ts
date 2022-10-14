import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { ExaminationService } from './examination.service';
import { CreateExaminationDto } from './dto/create-examination.dto';
import { UpdateExaminationDto } from './dto/update-examination.dto';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MotorVehicleService } from '../motor-vehicles/motor-vehicle.service';
import { MotorVehicle } from '../motor-vehicles/entities/motor-vehicle.entity';

@ApiTags('Examination')
@Controller('examination')
export class ExaminationController {
  constructor(
    private readonly examService: ExaminationService,
    // private readonly motorVehicleService: MotorVehicleService,

  ) { }

  @Post()
  @ApiNotFoundResponse({ description: 'If motorVehicle not exist!' })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while place order!',
  })
  @ApiOkResponse({ description: 'If create examination successfully! return object' })
  async create(
    @Res() res,
    @Body() dto: CreateExaminationDto) {

    const result = await this.examService.create(
      dto
    );

    if (result === -1) {
      return res.status(HttpStatus.NOT_FOUND)
        .send('motorVehicle does not exist!');
    }

    return res.status(HttpStatus.OK).send({
      id: result.id,
      examinationDate: result.examinationDate,
      mileage: result.mileage,
      motorVehicleId: result.motorVehicle.id,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Res() res,
    @Body() dto: UpdateExaminationDto) {
    const result = await this.examService.update(id, dto);
    return res.status(HttpStatus.OK).send(result)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.examService.findOne({ id: id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.examService.delete(id);
  }

  // @Get()
  // findAll() {
  //   return this.examinationService.findAll();
  // }
}
