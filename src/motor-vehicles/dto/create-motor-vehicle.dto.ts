
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { IsLicensePlateNumberValid } from "../../utils/validators/is-license-plate-number-valid";
import { IsNotExist } from "../../utils/validators/is-not-exists.validator";
import { isUUID } from "../../utils/validators/is-uuid-valid";


enum MotorVehicleTypeEnum {
    SmallLight = 'SmallLight',
    RegularLight = 'RegularLight',
    RegularHeavy = 'RegularHeavy',
    BigHeavy = 'BigHeavy',
}


export class CreateMotorVehicleDto {

    @ApiProperty({
        description: 'License Plate Number',
        example: 'ABC-123',
        required: true,
    })
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: 'mustBeNotEmpty' })
    @IsString()
    @Validate(IsLicensePlateNumberValid, {
        message: 'licensePlateNumberFormatIsInvalid',
    })
    @Validate(IsNotExist, ["MotorVehicle"], {
        message: 'licensePlateNumberAlreadyExists',
    })
    licensePlateNumber: string;


    @ApiProperty({
        enum: MotorVehicleTypeEnum,
        // add this to make this as a schema
        enumName: 'MotorVehicleTypeEnum',
        description: 'Type of Motor Vehicle',
        example: 'SmallLight',
        required: true,
    })
    @IsNotEmpty({ message: 'mustBeNotEmpty' })
    motorVehicleType: MotorVehicleTypeEnum;


    @ApiProperty({
        example: '2022-01-01',
        required: true,
    })
    @IsNotEmpty({ message: 'mustBeNotEmpty' })
    @Type(() => Date)
    manufactureDate: Date;


    @ApiProperty({
        example: 'cd3322cd-2641-45d6-a2b7-6c886ad697dc',
        description: 'motorVehicleOwner id',
        required: true,
    })
    @Validate(isUUID, {
        message: 'mustBeValidUUID',
    })
    @IsNotEmpty()
    motorVehicleOwnerId: string;
}
