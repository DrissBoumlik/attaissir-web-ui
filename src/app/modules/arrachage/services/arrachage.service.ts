import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HarvestConvocation} from '../classes/HarvestConvocation';

@Injectable({
    providedIn: 'root'
})
export class ArrachageService {
    routeName = 'harvest';

    constructor(private http: HttpClient) {
    }

    getEncodagesDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/sceri/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getOrderedParcels(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/parcels/ordered`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getConvocationsDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/convocations/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getEchontillonsDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/echantillons/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getInterventionById(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/${this.routeName}/interventions/${id}`);
    }

    saveAnalyse(analyse_data: any, id: number): Observable<any> {
        return this.http.put(`${environment.apiUrl}/${this.routeName}/interventions/${id}`, JSON.stringify({analyse: analyse_data}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    printConvocation(idConvocation: number) {
        return window.open(`${environment.apiUrl}/${this.routeName}/convocations/print/${idConvocation}`);
    }

    downloadMotif(motifId: number) {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/motif`, JSON.stringify({motifId: motifId}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }


    getChargementListDx(params: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/chargements/grid`, JSON.stringify(params), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getChargementById(idChargement): Observable<any> {
        return this.http.get(`${environment.apiUrl}/${this.routeName}/chargements/${idChargement}`);
    }

    convocate(convocation: HarvestConvocation): Observable<any> {
        const formData: FormData = new FormData();
        if (convocation.is_exception) {
            formData.append('document', convocation.is_exception.motif, convocation.is_exception.motif.name);
        }
        formData.append('data', JSON.stringify(convocation));
        return this.http.post(`${environment.apiUrl}/${this.routeName}/convocate`, formData);
    }

    genrateRotations(param: { idConvocation: number; nbr_camions: number; type_camion_id: number }): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/generate/rotations`, JSON.stringify(param), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getCamionTypes(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/${this.routeName}/camions/list`);
    }

    getGeneratedParcels(param: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/generated/grid`, JSON.stringify(param), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getRotations(idConvocation: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/generated/rotations`, JSON.stringify({idConvocation: idConvocation}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    proposeAssignment(codeRidelle: any, validated: boolean = false): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/rotation/assign`, JSON.stringify({
            codeRidelle: codeRidelle,
            validated: validated
        }), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    cancelRotation(idRotation: any): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/${this.routeName}/rotations/${idRotation}`);
    }


    getStructureConfig(): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/structure/config`, null);
    }

    getChartData(start_date: Date, end_date: Date): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/convocations/report`, JSON.stringify({
            start_date: start_date,
            end_date: end_date
        }), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getGeneratedTonnageChartData(start_date: Date, end_date: Date): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/tonnage/generated`, JSON.stringify({
            start_date: start_date,
            end_date: end_date
        }), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getHarvestVars(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/${this.routeName}/vars`);
    }

    getAvailableVehicles(selectedRotation: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/vehicles/available`, JSON.stringify({id_rotation: selectedRotation}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    assignVehiculeToRotationManual(
        id_truck: any,
        id_loader: any,
        encoding_status: any,
        last_rotation: any,
        parcel_id: any,
        selectedRotation: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/vehicles/assign/manual`, JSON.stringify({
            id_rotation: selectedRotation,
            id_truck,
            id_loader,
            encoding_status,
            parcel_id,
            last_rotation,
        }), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    addManualEncoding(encoding_data: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${this.routeName}/encoding/manual`, JSON.stringify({encoding_data: encoding_data}), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}
