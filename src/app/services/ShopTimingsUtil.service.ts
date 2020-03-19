
export class ShopTimingsUtil {

    static isTodayMonday(): boolean {
        var d = new Date();
        var n = d.getDay();
        return n === 1;
    }

    static isTodaySunday(): boolean {
        var d = new Date();
        var n = d.getDay();
        return n === 0;
    }


    public static isShopOpenAtGivenTime(time:string){
       return this.isShopOpenNow(time.split(":")[0],time.split(":")[1]);
    }


    public static isShopOpenNow($hour:any,$min:any) {
        if (ShopTimingsUtil.isTodayMonday()) {
            return false;
        }else {
            var date = new Date();
            var hours = $hour?$hour: date.getHours();
            var mins = $min?$min: date.getMinutes();
            if (ShopTimingsUtil.isTodaySunday()) {
                if (hours >= 12 && (hours < 22)) {
                    return true;
                }
            } else {
                if ((hours == 11 && mins >= 30) || (hours === 13 && mins <= 30) || (hours > 11 && hours < 13)) {
                    return true;
                }
                else if ((hours == 16 && mins >= 30) || (hours > 16 && hours < 22)) {
                    return true;
                }

            }          
        }

        return false;
    }
}